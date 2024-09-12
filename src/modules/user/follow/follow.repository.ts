import { DataSource, Repository } from "typeorm";
import { UserId } from "../model/user-user-id";
import { FollowEntity } from "./entity/follow.entity";
import {
  BLOCKED,
  CreateFollow,
  DeleteFollow,
  Follow,
  FollowersList,
  FOLLOWING,
  FollowingsList,
  UpdateFollow,
} from "./model/follow.model";
import { UserEntity } from "../entity/user.entity";
import {
  PaginatedResult,
  PaginationDto,
  paginationInfo,
  paginationSkip,
} from "../../../data/pagination";
import { Blacklist } from "./model/blacklist.model";
import { CloseFriends } from "./model/close-friend.model";

export interface IFollowRepository {
  userFollowings(
    followerId: UserId,
    pagination: PaginationDto
  ): Promise<PaginatedResult<FollowingsList>>;
  userFollowers(
    followingId: UserId,
    pagination: PaginationDto
  ): Promise<PaginatedResult<FollowersList>>;
  userBlacklist(
    followingId: UserId,
    pagination: PaginationDto
  ): Promise<PaginatedResult<Blacklist>>;
  userCloseFriends(
    followingId: UserId,
    pagination: PaginationDto
  ): Promise<PaginatedResult<CloseFriends>>;
  findFollowers(user: UserEntity): Promise<Follow[]>;
  findFollowings(followerId: UserId): Promise<Follow[]>;
  countFollowings(followerId: UserId): Promise<number>;
  countFollowers(followingId: UserId): Promise<number>;
  delete(follow: DeleteFollow): Promise<boolean>;
  update(follow: UpdateFollow): Promise<Follow>;
  create(follow: CreateFollow): Promise<Follow>;
  findByFollowerAndFollowing(
    followerId: UserId,
    followingId: UserId
  ): Promise<Follow | null>;
}

export class FollowRepository implements IFollowRepository {
  private flwrepo: Repository<FollowEntity>;

  constructor(private dataSource: DataSource) {
    this.flwrepo = dataSource.getRepository(FollowEntity);
  }

  async findFollowers(user: UserEntity): Promise<Follow[]> {
    return this.flwrepo.find({
      where: { following: user },
      relations: ["follower"],
    });
  }

  async findFollowings(followerId: UserId): Promise<Follow[]> {
    return await this.flwrepo.find({
      where: { followerId, followingStatus: FOLLOWING },
    });
  }

  async countFollowers(followingId: UserId): Promise<number> {
    return this.flwrepo.count({
      where: { followingId, followingStatus: FOLLOWING },
    });
  }

  async countFollowings(followerId: UserId): Promise<number> {
    return this.flwrepo.count({
      where: { followerId, followingStatus: FOLLOWING },
    });
  }

  async findByFollowerAndFollowing(
    followerId: UserId,
    followingId: UserId
  ): Promise<Follow | null> {
    return this.flwrepo.findOne({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });
  }
  async userFollowers(
    followingId: UserId,
    pagination: PaginationDto
  ): Promise<PaginatedResult<FollowersList>> {
    const result = await this.flwrepo.findAndCount({
      where: { followingId, followingStatus: FOLLOWING },
      relations: {
        follower: { avatar: true, followers: true },
      },
      skip: paginationSkip(pagination),
      take: pagination.limit,
    });
    const { nextPage, totalPages } = paginationInfo(result[1], pagination);

    return {
      followers: result[0].map((rs) => {
        return {
          id: rs.follower.id,
          firstName: rs.follower.firstName,
          lastName: rs.follower.lastName,
          username: rs.follower.username,
          avatar: rs.follower.avatar,
          followersCount: rs.follower.followers.filter(
            (follower) => follower.followingStatus === FOLLOWING
          ).length,
        };
      }),
      nextPage,
      totalPages,
    };
  }

  async userFollowings(
    followerId: UserId,
    pagination: PaginationDto
  ): Promise<PaginatedResult<FollowingsList>> {
    const result = await this.flwrepo.findAndCount({
      where: { followerId, followingStatus: FOLLOWING },
      relations: { following: { avatar: true, followers: true } },
      skip: paginationSkip(pagination),
      take: pagination.limit,
    });
    const { nextPage, totalPages } = paginationInfo(result[1], pagination);

    return {
      followings: result[0].map((rs) => {
        return {
          id: rs.following.id,
          firstName: rs.following.firstName,
          lastName: rs.following.lastName,
          username: rs.following.username,
          avatar: rs.following.avatar,
          followersCount: rs.following.followers.filter(
            (follower) => follower.followingStatus === FOLLOWING
          ).length,
        };
      }),
      nextPage,
      totalPages,
    };
  }

  async userBlacklist(
    followingId: UserId,
    pagination: PaginationDto
  ): Promise<PaginatedResult<Blacklist>> {
    const result = await this.flwrepo.findAndCount({
      where: { followingId, followingStatus: BLOCKED },
      relations: { follower: { avatar: true, followers: true } },
      skip: paginationSkip(pagination),
      take: pagination.limit,
    });
    const { nextPage, totalPages } = paginationInfo(result[1], pagination);

    return {
      users: result[0].map((rs) => {
        return {
          id: rs.follower.id,
          firstName: rs.follower.firstName,
          lastName: rs.follower.lastName,
          username: rs.follower.username,
          avatar: rs.follower.avatar,
          followersCount: rs.follower.followers.filter(
            (follower) => follower.followingStatus === FOLLOWING
          ).length,
        };
      }),
      nextPage,
      totalPages,
    };
  }

  async userCloseFriends(
    followingId: UserId,
    pagination: PaginationDto
  ): Promise<PaginatedResult<CloseFriends>> {
    const result = await this.flwrepo.findAndCount({
      where: { followingId, followingStatus: FOLLOWING, isCloseFriend: true },
      relations: { follower: { avatar: true, followers: true } },
      skip: paginationSkip(pagination),
      take: pagination.limit,
    });
    const { nextPage, totalPages } = paginationInfo(result[1], pagination);

    return {
      users: result[0].map((rs) => {
        return {
          id: rs.follower.id,
          firstName: rs.follower.firstName,
          lastName: rs.follower.lastName,
          username: rs.follower.username,
          avatar: rs.follower.avatar,
          followersCount: rs.follower.followers.filter(
            (follower) => follower.followingStatus === FOLLOWING
          ).length,
        };
      }),
      nextPage,
      totalPages,
    };
  }

  async create(follow: CreateFollow): Promise<Follow> {
    return await this.flwrepo.save({ ...follow });
  }

  async delete(follow: DeleteFollow): Promise<boolean> {
    return Boolean(await this.flwrepo.delete(follow));
  }

  async update(follow: UpdateFollow): Promise<Follow> {
    return await this.flwrepo.save(follow);
  }
}

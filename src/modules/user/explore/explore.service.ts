import { FollowService } from "../../user/follow/follow.service";
import { UserId } from "../../user/model/user-user-id";
import { IExploreRepository } from "./explore-repository";
import { ExploreDto } from "./dto/explore-dto";

export class ExploreService {
  constructor(
    private exploreRepo: IExploreRepository,
    private flwService: FollowService
  ) {}

  async explore(followerId: UserId, dto: ExploreDto) {
    const followings = await this.flwService.findFollowings(followerId);

    const followingIds: UserId[] = followings.map(
      (following) => following.followingId
    );

    return await this.exploreRepo.findPostsByUserIds(followingIds, followerId, {
      page: dto.page,
      limit: dto.limit,
    });
  }
}

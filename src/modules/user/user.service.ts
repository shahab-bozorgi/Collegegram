import { compare, hash } from "bcrypt";
import {
  BadRequest,
  Forbidden,
  HttpError,
  NotFound,
  UnAuthorized,
} from "../../utilities/http-error";
import { SignUpDto } from "./dto/create-user.dto";
import {
  AuthenticatedUserProfile,
  BaseProfile,
  OtherUserProfile,
  User,
} from "./model/user.model";
import { IUserRepository } from "./user.repository";
import { LoginUserDto } from "./dto/login-user.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";
import jwt from "jsonwebtoken";
import { isUsername, Username } from "./model/user-username";
import { UserId } from "./model/user-user-id";
import { Email, isEmail } from "../../data/email";
import { PasswordResetService } from "../password-reset/password-reset.service";
import { PasswordResetDto } from "../password-reset/dto/password-reset.dto";
import { PostService } from "../post/post.service";
import { FollowService } from "./follow/follow.service";
import { MediaService } from "../media/media.service";
import { NoneEmptyString } from "../../data/non-empty-string";
import { MIME } from "../media/field-types/mime";
import { BLOCKED } from "./follow/model/follow.model";

export class UserService {
  constructor(private userRepo: IUserRepository) {}

  async create(dto: SignUpDto): Promise<User> {
    if (await this.userRepo.findByUsername(dto.username)) {
      throw new BadRequest("نام کاربری از قبل وجود داره!");
    }

    if (await this.userRepo.findByEmail(dto.email)) {
      throw new BadRequest("آدرس ایمیل از قبل وجود داره!");
    }

    return await this.userRepo.create({
      username: dto.username,
      password: await hash(dto.password, 12),
      email: dto.email,
    });
  }

  async findByUsername(username: Username): Promise<User | null> {
    return await this.userRepo.findByUsername(username);
  }

  async login({ username, password }: LoginUserDto) {
    let user;
    if (isEmail(username)) {
      user = await this.userRepo.findByEmail(username);
    } else {
      user = await this.userRepo.findByUsername(username);
    }

    if (!user || (user && !(await compare(password, user.password))))
      throw new UnAuthorized("نام کاربری یا رمز عبور اشتباهه!");

    const secretKey = process.env.SECRET_KEY ?? "super-secret";

    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "1h",
    });

    return { token: token };
  }

  async editProfile(
    userId: UserId,
    dto: EditProfileDto,
    mediaService: MediaService,
    file?: Express.Multer.File
  ): Promise<User | null> {
    const user = (await this.userRepo.findById(userId, ["avatar"]))!;
    if (
      dto.email &&
      dto.email !== user.email &&
      (await this.userRepo.findByEmail(dto.email))
    ) {
      throw new BadRequest("این ایمیل از قبل وجود دارد!");
    }

    if (file) {
      if (user.avatar) {
        await mediaService.delete(user.avatar.id);
      }
      user.avatar = await mediaService.create({
        name: file.filename as NoneEmptyString,
        mime: file.mimetype as MIME,
        size: file.size,
        path: file.path,
      });
    }

    if (dto.password) {
      user.password = await hash(dto.password, 12);
    }

    return await this.userRepo.update({
      ...user,
      firstName: dto.firstName,
      lastName: dto.lastName,
      bio: dto.bio,
      email: dto.email,
      isPrivate: dto.isPrivate,
    });
  }

  async userProfile(
    username: Username,
    authenticatedUser: User,
    postService: PostService,
    followService: FollowService
  ): Promise<AuthenticatedUserProfile | OtherUserProfile> {
    const user = await this.userRepo.findByUsername(username, ["avatar"]);
    if (!user) {
      throw new NotFound("User not found");
    }

    const baseProfile: BaseProfile = {
      id: user.id,
      avatar: user.avatar,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      isPrivate: user.isPrivate,
      followingsCount: await followService.getcountFollowing(user.id),
      followersCount: await followService.getcountFollowers(user.id),
      postsCount: await postService.getPostsCount(user),
    };

    if (user.id === authenticatedUser.id) {
      return { ...baseProfile, email: user.email };
    }

    const followingStatus = await followService.getFollowingStatus(
      user.id,
      authenticatedUser.id
    );
    const authenticatedStatus = await followService.getFollowingStatus(
      authenticatedUser.id,
      user.id
    );
    return {
      ...baseProfile,
      followingStatus: followingStatus.status,
      followedStatus: authenticatedStatus.status,
      isCloseFriend: authenticatedStatus.isCloseFriend,
    };
  }

  async getUserBy(
    field: Email | Username | UserId,
    relations?: string[]
  ): Promise<User | null> {
    let user;
    if (isEmail(field)) {
      user = await this.userRepo.findByEmail(field, relations);
    } else if (isUsername(field)) {
      user = await this.userRepo.findByUsername(field, relations);
    } else {
      user = await this.userRepo.findById(field, relations);
    }

    return user;
  }

  async passwordReset(
    dto: PasswordResetDto,
    passwordResetService: PasswordResetService
  ): Promise<void | never> {
    const passwordReset = await passwordResetService.findToken(dto.token);

    if (!passwordReset) throw new Forbidden("Access forbidden");

    await passwordResetService.deleteToken(dto.token);
    if (passwordReset.expireAt < new Date())
      throw new BadRequest("Token expired");

    passwordReset.user.password = await hash(dto.password, 12);
    if (!(await this.userRepo.update(passwordReset.user)))
      throw new HttpError(500, "Something went wrong");
  }

  async whereUsernameIn(usernames: Username[]): Promise<User[]> {
    return this.userRepo.whereUsernameIn(usernames);
  }
}

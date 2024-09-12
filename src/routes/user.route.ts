import { Router } from "express";
import { UserService } from "../modules/user/user.service";
import { toUsername, Username } from "../modules/user/model/user-username";
import { EditProfileSchema } from "../modules/user/dto/edit-profile.dto";
import { MBToBytes, uploadSingleFile } from "../utilities/upload";
import { PositiveInt } from "../data/int";
import { MediaService } from "../modules/media/media.service";
import { imageMIMEs } from "../modules/media/field-types/mime";
import { expressHandler, handleExpress } from "../utilities/handle-express";
import { PostService } from "../modules/post/post.service";
import { FollowService } from "../modules/user/follow/follow.service";
import { parseDtoWithSchema } from "../utilities/parse-dto-handler";
import { followSchema } from "../modules/user/follow/dto/follow.dto";
import { unfollowSchema } from "../modules/user/follow/dto/unfollow.dto";
import { GetFollowingListsSchema } from "../modules/user/follow/dto/get-followings.dto";
import { GetFollowerListsSchema } from "../modules/user/follow/dto/get-followers.dto";
import { followRequestSchema } from "../modules/user/follow/dto/follow-request.dto";
import { exploreSchema } from "../modules/user/explore/dto/explore-dto";
import { ExploreService } from "../modules/user/explore/explore.service";
import { blockUserSchema } from "../modules/user/follow/dto/block-user.dto";
import { unblockUserSchema } from "../modules/user/follow/dto/unblock-user.dto";
import { paginationSchema } from "../data/pagination";
import { zodUserId } from "../modules/user/model/user-user-id";
import { z } from "zod";
import { addAndRemveCloseFriendSchema } from "../modules/user/follow/dto/add-close-friends.dto";
import WebSocket from "ws";
import { sendMessageToUser } from "../modules/user/message/websocketManager";
import { MessageService } from "../modules/user/message/message.service";

export const makeUserRouter = (
  userService: UserService,
  followService: FollowService,
  mediaService: MediaService,
  postService: PostService,
  exploreService: ExploreService,
  messageService: MessageService
) => {
  const app = Router();

  // const wsServer = new WebSocket.Server({ noServer: true });

  // wsServer.on("connection", (ws) => {
  //   ws.on("message", (message) => {
  //     console.log("Received message:", message.toString());
  //   });

  //   ws.send("Welcome to the WebSocket server shahab!");
  // });

  // app.use("/ws", (req, res, next) => {
  //   if (req.headers.upgrade === "websocket") {
  //     wsServer.handleUpgrade(req, req.socket as any, Buffer.alloc(0), (ws) => {
  //       wsServer.emit("connection", ws, req);
  //     });
  //   } else {
  //     next();
  //   }
  // });

  app.patch(
    "/profile",
    uploadSingleFile(
      "users/avatar",
      "avatar",
      imageMIMEs,
      MBToBytes(5 as PositiveInt)
    ),
    async (req, res, next) => {
      try {
        const dto = EditProfileSchema.parse(req.body);
        await userService.editProfile(req.user.id, dto, mediaService, req.file);
        res.json({ ok: true, data: {} });
      } catch (e) {
        next(e);
      }
    }
  );

  app.get("/profile", (req, res) => {
    const username = (req.query.username as Username) ?? req.user.username;
    handleExpress(res, () =>
      userService.userProfile(username, req.user, postService, followService)
    );
  });

  app.get("/explore", (req, res) => {
    const dto = parseDtoWithSchema(req.query, exploreSchema);
    expressHandler(req, res, () => exploreService.explore(req.user.id, dto));
  });

  app.post("/follow/:followingId", (req, res) => {
    const dto = parseDtoWithSchema(req.params, followSchema);
    expressHandler(req, res, () => {
      return followService.followUser(
        req.user.id,
        dto.followingId,
        userService
      );
    });
  });

  app.delete("/unfollow/:followingId", (req, res) => {
    const dto = parseDtoWithSchema(req.params, unfollowSchema);
    expressHandler(req, res, () => {
      return followService.unfollowUser(
        req.user.id,
        dto.followingId,
        userService
      );
    });
  });

  app.delete("/followers/:followerId/delete", (req, res) => {
    const dto = parseDtoWithSchema(req.params, unfollowSchema);
    expressHandler(req, res, () =>
      followService.deleteFollower(req.user.id, dto.followerId, userService)
    );
  });

  app.get("/:userId/followers", async (req, res) => {
    const dto = parseDtoWithSchema(
      {
        followingId: req.params.userId,
        page: req.query.page,
        limit: req.query.limit,
      },
      GetFollowerListsSchema
    );
    expressHandler(req, res, () => followService.getFollowers(dto));
  });

  app.get("/:userId/followings", async (req, res) => {
    const dto = parseDtoWithSchema(
      {
        followerId: req.params.userId,
        page: req.query.page,
        limit: req.query.limit,
      },
      GetFollowingListsSchema
    );
    expressHandler(req, res, () => followService.getFollowings(dto));
  });

  app.patch("/follow/:followerId/request/accept", async (req, res) => {
    const dto = parseDtoWithSchema(req.params, followRequestSchema);
    expressHandler(req, res, () => {
      return followService.acceptFollowUser(
        req.user.id,
        dto.followerId,
        userService
      );
    });
  });

  app.delete("/follow/:followerId/request/reject", async (req, res) => {
    const dto = parseDtoWithSchema(req.params, followRequestSchema);
    expressHandler(req, res, () => {
      return followService.rejectFollowUser(
        req.user.id,
        dto.followerId,
        userService
      );
    });
  });

  app.post("/:userId/block", (req, res) => {
    const dto = parseDtoWithSchema(req.params, blockUserSchema);
    expressHandler(req, res, () => followService.blockUser(req.user.id, dto));
  });

  app.delete("/:userId/unblock", (req, res) => {
    const dto = parseDtoWithSchema(req.params, unblockUserSchema);
    expressHandler(req, res, () => followService.unblockUser(req.user.id, dto));
  });

  app.get("/blacklist", (req, res) => {
    const paginationDto = parseDtoWithSchema(req.query, paginationSchema);
    expressHandler(req, res, () =>
      followService.getBlacklist(req.user.id, paginationDto)
    );
  });

  app.patch("/close-friends/:followerId/add", (req, res) => {
    const dto = parseDtoWithSchema(req.params, addAndRemveCloseFriendSchema);
    expressHandler(req, res, () =>
      followService.addCloseFriend(dto.followerId, req.user.id)
    );
  });

  app.patch("/close-friends/:followerId/remove", (req, res) => {
    const dto = parseDtoWithSchema(req.params, addAndRemveCloseFriendSchema);
    expressHandler(req, res, () =>
      followService.removeCloseFriend(dto.followerId, req.user.id)
    );
  });

  app.get("/close-friends", (req, res) => {
    const paginationDto = parseDtoWithSchema(req.query, paginationSchema);
    expressHandler(req, res, () =>
      followService.getCloseFriends(req.user.id, paginationDto)
    );
  });

  app.post("/messages/send", async (req, res) => {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    if (!receiverId || !content) {
      return res
        .status(400)
        .json({ ok: false, error: "Receiver ID and content are required" });
    }

    sendMessageToUser(receiverId, JSON.stringify({ senderId, content }));

    try {
      await messageService.createMessage(senderId, receiverId, content);
      res.json({ ok: true, data: { message: "Message sent successfully" } });
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ ok: false, error: "Failed to send message" });
    }
  });


  app.get("/:username", (req, res) => {
    const username: Username = toUsername(req.params.username);
    const user = userService.findByUsername(username);
    res.status(200).send(user);
  });

  return app;
};

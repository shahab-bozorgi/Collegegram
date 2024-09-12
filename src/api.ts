import express from "express";
import dotenv from "dotenv-flow";
dotenv.config();
import { createServer } from "http"; 
import { WebSocketServer, WebSocket } from "ws"; 
import { UserRepository } from "./modules/user/user.repository";
import { UserService } from "./modules/user/user.service";
import { makeUserRouter } from "./routes/user.route";
import { DataSource } from "typeorm";
import { authMiddleware } from "./middleware/authenticate.middleware";
import { makeAuthRouter } from "./routes/auth.route";
import cors from "cors";
import { swaggerOptions } from "./swagger";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { PasswordResetRepository } from "./modules/password-reset/password-reset.repository";
import { PasswordResetService } from "./modules/password-reset/password-reset.service";
import { MediaRepository } from "./modules/media/media.repository";
import { MediaService } from "./modules/media/media.service";
import { PostRepository } from "./modules/post/post.repository";
import { PostService } from "./modules/post/post.service";
import { makePostRouter } from "./routes/post.route";
import { TagRepository } from "./modules/tag/tag.repository";
import { TagService } from "./modules/tag/tag.service";
import { CommentService } from "./modules/post/comment/comment.service";
import { CommentRepository } from "./modules/post/comment/comment.repository";
import { LikeCommentRepository } from "./modules/post/comment/like-comment/like-comment-repository";
import { LikeCommentService } from "./modules/post/comment/like-comment/like-comment.service";
import { errorHandler } from "./utilities/error-handler";
import { FollowService } from "./modules/user/follow/follow.service";
import { FollowRepository } from "./modules/user/follow/follow.repository";
import { LikePostService } from "./modules/post/like-post/like-post.service";
import { LikePostRepository } from "./modules/post/like-post/like-post-repository";
import { BookmarkRepository } from "./modules/post/bookmark/bookmark.repository";
import { BookmarkService } from "./modules/post/bookmark/bookmark.service";
import { ExploreRepository } from "./modules/user/explore/explore-repository";
import { ExploreService } from "./modules/user/explore/explore.service";
import { wsServer } from "./modules/user/message/websocketManager";
import { MessageService } from "./modules/user/message/message.service";
import { MessageRepository } from "./modules/user/message/message-repository";

export const makeApp = (dataSource: DataSource) => {
  const app = express();
  const server = createServer(app);

  const wss = new WebSocketServer({ noServer: true });
  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      console.log("Received message:", message.toString());
    });

    ws.send("Welcome to the WebSocket server!");
  });

  server.on("upgrade", (request, socket, head) => {
    if (request.headers.upgrade === "websocket") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
  });

  app.use((req, res, next) => {
    if (req.headers.upgrade === "websocket") {
      wsServer.handleUpgrade(req, req.socket as any, Buffer.alloc(0), (ws) => {
        wsServer.emit("connection", ws, req);
      });
    } else {
      next();
    }
  });


  const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  };
  app.use(express.json());
  app.use(cors(corsOptions));

  const swaggerDocs = swaggerjsdoc(swaggerOptions);
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use("/uploads", express.static("uploads"));

  if (process.env.NODE_ENV !== "test") {
    app.use((req, res, next) => {
      console.log(req.method, req.url);
      next();
    });
  }

  const mediaRepository = new MediaRepository(dataSource);
  const mediaService = new MediaService(mediaRepository);
  const passwordResetRepository = new PasswordResetRepository(dataSource);
  const passwordResetService = new PasswordResetService(
    passwordResetRepository
  );
  const userRepository = new UserRepository(dataSource);
  const userService = new UserService(userRepository);
  const followRepository = new FollowRepository(dataSource);
  const followService = new FollowService(followRepository);
  const postRepository = new PostRepository(dataSource);
  const postService = new PostService(postRepository, mediaService);
  const tagRepository = new TagRepository(dataSource);
  const tagService = new TagService(tagRepository);
  const commentRepository = new CommentRepository(dataSource);
  const commentService = new CommentService(commentRepository);
  const likeCommentRepository = new LikeCommentRepository(dataSource);
  const likeCommentService = new LikeCommentService(likeCommentRepository);
  const likePostRepository = new LikePostRepository(dataSource);
  const likePostService = new LikePostService(likePostRepository);
  const bookmarkRepository = new BookmarkRepository(dataSource);
  const bookmarkService = new BookmarkService(bookmarkRepository);
  const exploreRepository = new ExploreRepository(dataSource);
  const exploreService = new ExploreService(exploreRepository, followService);
  const messageRepository = new MessageRepository(dataSource);
  const messageService = new MessageService(messageRepository);

  app.use("/auth", makeAuthRouter(userService, passwordResetService));
  app.use(
    "/users",
    authMiddleware(userService),

    makeUserRouter(
      userService,
      followService,
      mediaService,
      postService,
      exploreService,
      messageService
    )
  );
  app.use(
    "/posts",
    authMiddleware(userService),
    makePostRouter(
      postService,
      userService,
      tagService,
      commentService,
      likeCommentService,
      likePostService,
      bookmarkService,
      followService
    )
  );

  app.use((req, res) => {
    res.status(404).send({ message: "Not Found!" });
  });

  app.use(errorHandler);

  return server; 

};

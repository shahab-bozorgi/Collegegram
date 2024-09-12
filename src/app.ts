import { makeApp } from "./api";
import { AppDataSource } from "./data-source";
import { User } from "./modules/user/model/user.model";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
const PORT = process.env.PORT ?? 3000;
AppDataSource.initialize()
  .then((dataSource) => makeApp(dataSource))
  .then((server) => {
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing server:', error);
  });

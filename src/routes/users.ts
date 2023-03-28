import { FastifyInstance } from "fastify";
import {
  destroyAllControlIdUsers,
  createUserController,
  getAllControlIDUsers,
  disableUserBiometry,
} from "../controllers/UserController";

export const UserRoutes = async (app: FastifyInstance) => {
  app.post("/create-user", createUserController);
  app.delete("/destroy/control-id-users", destroyAllControlIdUsers);
  app.get("/list/control-id-users", getAllControlIDUsers);
  app.get("/disable-biometry", disableUserBiometry);
};

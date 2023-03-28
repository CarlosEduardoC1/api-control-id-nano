import { FastifyInstance } from "fastify";
import { listMappedHostsController, mapHostsController, pingController } from "../controllers/app";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/ping", pingController);
  app.get("/map-hosts", mapHostsController);
  app.get("/list/mapped-hosts", listMappedHostsController);
};

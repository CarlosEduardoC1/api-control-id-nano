import { FastifyInstance } from "fastify";
import {
  createTemplateController,
  destroyTemplates,
  getAllTemplates,
} from "../controllers/TemplateController";

export const TemplatesRoutes = async (app: FastifyInstance) => {
  app.post("/create-template", createTemplateController);
  app.get("/list/all-templates", getAllTemplates);
  app.delete("/destroy/control-id-templates", destroyTemplates);
};

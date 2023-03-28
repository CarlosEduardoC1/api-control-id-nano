import { z } from "zod";
import { FastifyRequest } from "fastify";
import { TemplateModel } from "../models/TemplateModel";

export const createTemplateController = async (request: FastifyRequest) => {
  try {
    const templateService = new TemplateModel();
    const templateQueryObject = z.object({
      id: z.string(),
      user_id: z.string(),
    });
    const templateBodyObject = z.object({
      template: z.string(),
    });

    const { id, user_id } = templateQueryObject.parse(request.query);
    const { template } = templateBodyObject.parse(request.body);

    const response = await templateService._createTemplate({
      id: Number(id),
      user_id: Number(user_id),
      template,
      finger_type: 0,
    });

    return { response };
  } catch (error) {
    return error;
  }
};

export const getAllTemplates = async (request: FastifyRequest) => {
  try {
    const templateService = new TemplateModel();
    const templateQuery = z.object({
      user_id: z.string().optional(),
    });
    const { user_id } = templateQuery.parse(request.query);
    const response = await templateService._loadAllTemplates(Number(user_id));
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const destroyTemplates = async (request: FastifyRequest) => {
  try {
    const templateService = new TemplateModel();
    const templateQuery = z.object({
      id: z.string(),
    });

    const { id } = templateQuery.parse(request.query);

    const response = await templateService._destroyTemplate(Number(id));
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

import { UserControlIDModels } from "../models/UserControlIDModel";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyRequest } from "fastify";

export const createUserController = async (request: FastifyRequest) => {
  try {
    const userService = new UserControlIDModels();
    const userObject = z.object({
      name: z.string(),
    });
    const { name } = userObject.parse(request.body);

    const user = await prisma.users.create({ data: { name } });

    const response = await userService._createUser({
      values: [
        {
          name,
          id: user.id,
          registration: "",
          salt: "",
          password: "",
        },
      ],
    });

    return { user, response };
  } catch (error) {
    return error;
  }
};

export const destroyAllControlIdUsers = async () => {
  try {
    const userService = new UserControlIDModels();
    const destroyed = await userService._deleteAllUsers();
    return destroyed;
  } catch (error) {
    return error;
  }
};

export const getAllControlIDUsers = async () => {
  try {
    const userService = new UserControlIDModels();
    const list = await userService._listAllControlIdUsers();
    return list;
  } catch (error) {
    return error;
  }
};

export const disableUserBiometry = async (request: FastifyRequest) => {
  try {
    const userService = new UserControlIDModels();
    const userObject = z.object({
      id: z.string(),
    });
    const { id } = userObject.parse(request.query);

    const disabled = await userService._disableBiometry(Number(id));
    return disabled;
  } catch (error) {
    return error;
  }
};

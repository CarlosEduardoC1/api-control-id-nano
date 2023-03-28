import { FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import axios from "axios";
import nodeCache from "../lib/node-cache";

export const mapHostsController = async (request: FastifyRequest) => {
  const hosts = await prisma.hosts.findMany();
  const length: number = hosts.length;
  let hostsWithSession: { url: string; session: string }[] = [];
  let hostsWithNoSession: { url: string }[] = [];

  for (let i = 0; i < length; i++) {
    const { ip, port } = hosts[i];
    const url: string = `http://${ip}:${port}`;
    try {
      const {
        data: { session },
      } = await axios.post(`${url}/login.fcgi`, {
        login: process.env.CLIENTE_USER,
        password: process.env.CLIENT_PASSWORD,
      });

      hostsWithSession.push({ url, session });
    } catch (error) {
      hostsWithNoSession.push({ url });
    }
  }

  nodeCache.set("hosts", hostsWithSession);
  return { hostsWithNoSession, hostsWithSession };
};

export const listMappedHostsController = async () => {
  try {
    const hostsMapped = nodeCache.get("hosts");
    return hostsMapped;
  } catch (error) {
    return error;
  }
};

export const pingController = async () => {
  return {
    timestap: new Date(),
    version: process.env.VERSION,
  };
};

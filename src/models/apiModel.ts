import axios from "axios";
import nodeCache from "../lib/node-cache";
import { ApiHosts } from "../interfaces";

export class Api {
  constructor() {}

  private mapHosts(): any {
    let urlArray: ApiHosts[] = [];
    const hosts = nodeCache.get("hosts") as ApiHosts[];
    const length: number = hosts.length;

    for (let i = 0; i < length; i++) {
      const { url, session } = hosts[i];
      urlArray.push({ url, session });
    }
    return urlArray;
  }

  public async post(
    restUrl: string,
    requestData: any
  ): Promise<{ status: number; data: any }[]> {
    const connections: ApiHosts[] = this.mapHosts();
    const responses: { status: number; data: any }[] = [];
    const length: number = connections.length;

    for (let i = 0; i < length; i++) {
      try {
        const { url, session } = connections[i];
        const { status, data } = await axios.post(
          `${url}/${restUrl}`,
          requestData,
          { params: { session } }
        );
        responses.push({ status, data });
      } catch (error) {
        console.log(error);
        responses.push({ status: 500, data: error });
      }
    }

    return responses;
  }

  public async get(restUrl: string): Promise<{ status: number; data: any }[]> {
    const connections: ApiHosts[] = this.mapHosts();
    const responses: { status: number; data: any }[] = [];
    const length: number = connections.length;

    for (let i = 0; i < length; i++) {
      try {
        const { url, session } = connections[i];
        const { status, data } = await axios.get(`${url}/${restUrl}`, {
          params: { session },
        });
        responses.push({ status, data });
      } catch (error) {
        responses.push({ status: 500, data: error });
      }
    }

    return responses;
  }
}

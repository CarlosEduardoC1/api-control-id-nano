import { Api } from "./apiModel";
import { UserModelContrlId } from "../@types";

export class UserControlIDModels {
  protected apiService = new Api();

  constructor() {}

  _createUser(object: UserModelContrlId) {
    return this.apiService.post("create_objects.fcgi", {
      ...object,
      object: "users",
    });
  }

  _deleteAllUsers() {
    return this.apiService.post(`destroy_objects.fcgi`, {
      object: "users",
    });
  }

  _listAllControlIdUsers() {
    return this.apiService.post("load_objects.fcgi", {
      object: "users",
    });
  }

  _disableBiometry(id: number) {
    return this.apiService.post("destroy_objects.fcgi", {
      object: "users",
      where: {
        users: { id },
      },
    });
  }
}

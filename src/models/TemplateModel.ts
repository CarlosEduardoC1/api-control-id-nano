import { Api } from "./apiModel";
import { ObjectQuery, TemplateControlIdModel, Where } from "../@types";

export class TemplateModel {
  protected apiService = new Api();

  constructor() {}

  _createTemplate(object: TemplateControlIdModel): Promise<any> {
    return this.apiService.post("create_objects.fcgi", {
      values: [object],
      object: "templates",
    });
  }

  _loadAllTemplates(user_id?: number): Promise<any> {
    var objectSended: ObjectQuery = { object: "templates" };

    if (user_id) {
      var where: Where = { templates: { user_id } };
      objectSended = { ...objectSended, where };
    }

    return this.apiService.post("load_objects.fcgi", {
      ...objectSended,
    });
  }

  _destroyTemplate(id: number): Promise<any> {
    return this.apiService.post("destroy_objects.fcgi", {
      object: "templates",
      where: {
        templates: {
          id,
        },
      },
    });
  }
}

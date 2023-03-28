export type UserModelContrlId = {
  values: {
    id: number;
    name: string;
    registration?: string;
    password?: string;
    salt?: string;
  }[];
};

export type ParamsRequest = {
  session: string;
};

export type DestroyControlUsers = {
  where: {
    users: {
      id: number;
    };
  };
};

export type UserControlIdList = {
  users: Array<{
    id: number;
    registration: string;
    name: string;
    password: string;
  }>;
};

export type TemplateControlIdModel = {
  id: number;
  finger_type: number;
  template: string;
  user_id: number;
};

export type Where = {
  templates: {
    user_id: number;
  };
};

export type ObjectQuery = {
  object: string;
  where?: Where;
};

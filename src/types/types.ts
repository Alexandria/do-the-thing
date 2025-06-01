export interface Action {
  type: string;
  payload: string;
}

export const ActionTypes = {
  UpdateTitle: "updateTitle",
  UpdateCategory: "updateCategory",
  UpdateDescription: "updateDescription",
  UpdateImage: "updateImage",
};

export interface Task {
  id: string;
  title: string;
  category: string;
  description?: string;
  image?: string;
}

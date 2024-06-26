import { createContext } from "react";

export const PostLister = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  fetching: (false),
});



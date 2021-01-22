import { ArticleWhereUniqueInput } from "../article/ArticleWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Comment = {
  article: ArticleWhereUniqueInput;
  author: UserWhereUniqueInput;
  body: string;
  createdAt: Date;
  id: string;
  updatedAt: Date;
};

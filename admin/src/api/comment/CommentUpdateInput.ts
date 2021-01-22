import { ArticleWhereUniqueInput } from "../article/ArticleWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CommentUpdateInput = {
  article?: ArticleWhereUniqueInput;
  author?: UserWhereUniqueInput;
  body?: string;
};

import { ArticleWhereUniqueInput } from "../article/ArticleWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CommentCreateInput = {
  article: ArticleWhereUniqueInput;
  author: UserWhereUniqueInput;
  body: string;
};

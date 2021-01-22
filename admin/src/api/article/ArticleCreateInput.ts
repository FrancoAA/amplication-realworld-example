import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ArticleCreateInput = {
  author: UserWhereUniqueInput;
  body: string;
  description: string;
  favoritesCount?: number | null;
  slug?: string | null;
  test?: string | null;
  title: string;
};

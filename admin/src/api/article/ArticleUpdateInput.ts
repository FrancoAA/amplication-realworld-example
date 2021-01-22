import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ArticleUpdateInput = {
  author?: UserWhereUniqueInput;
  body?: string;
  description?: string;
  favoritesCount?: number | null;
  slug?: string | null;
  test?: string | null;
  title?: string;
};

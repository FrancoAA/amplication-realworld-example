import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ArticleWhereInput = {
  author?: UserWhereUniqueInput;
  body?: string;
  createdAt?: Date;
  description?: string;
  favoritesCount?: number | null;
  id?: string;
  slug?: string | null;
  test?: string | null;
  title?: string;
  updatedAt?: Date;
};

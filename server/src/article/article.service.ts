import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneArticleArgs,
  FindManyArticleArgs,
  ArticleCreateArgs,
  ArticleUpdateArgs,
  ArticleDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyArticleArgs>(
    args: Subset<T, FindManyArticleArgs>
  ) {
    return this.prisma.article.findMany(args);
  }
  findOne<T extends FindOneArticleArgs>(args: Subset<T, FindOneArticleArgs>) {
    return this.prisma.article.findOne(args);
  }
  create<T extends ArticleCreateArgs>(args: Subset<T, ArticleCreateArgs>) {
    return this.prisma.article.create<T>(args);
  }
  update<T extends ArticleUpdateArgs>(args: Subset<T, ArticleUpdateArgs>) {
    return this.prisma.article.update<T>(args);
  }
  delete<T extends ArticleDeleteArgs>(args: Subset<T, ArticleDeleteArgs>) {
    return this.prisma.article.delete(args);
  }
}

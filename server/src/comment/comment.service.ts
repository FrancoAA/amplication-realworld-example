import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneCommentArgs,
  FindManyCommentArgs,
  CommentCreateArgs,
  CommentUpdateArgs,
  CommentDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyCommentArgs>(
    args: Subset<T, FindManyCommentArgs>
  ) {
    return this.prisma.comment.findMany(args);
  }
  findOne<T extends FindOneCommentArgs>(args: Subset<T, FindOneCommentArgs>) {
    return this.prisma.comment.findOne(args);
  }
  create<T extends CommentCreateArgs>(args: Subset<T, CommentCreateArgs>) {
    return this.prisma.comment.create<T>(args);
  }
  update<T extends CommentUpdateArgs>(args: Subset<T, CommentUpdateArgs>) {
    return this.prisma.comment.update<T>(args);
  }
  delete<T extends CommentDeleteArgs>(args: Subset<T, CommentDeleteArgs>) {
    return this.prisma.comment.delete(args);
  }
}

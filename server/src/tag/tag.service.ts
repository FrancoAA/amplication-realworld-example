import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneTagArgs,
  FindManyTagArgs,
  TagCreateArgs,
  TagUpdateArgs,
  TagDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyTagArgs>(args: Subset<T, FindManyTagArgs>) {
    return this.prisma.tag.findMany(args);
  }
  findOne<T extends FindOneTagArgs>(args: Subset<T, FindOneTagArgs>) {
    return this.prisma.tag.findOne(args);
  }
  create<T extends TagCreateArgs>(args: Subset<T, TagCreateArgs>) {
    return this.prisma.tag.create<T>(args);
  }
  update<T extends TagUpdateArgs>(args: Subset<T, TagUpdateArgs>) {
    return this.prisma.tag.update<T>(args);
  }
  delete<T extends TagDeleteArgs>(args: Subset<T, TagDeleteArgs>) {
    return this.prisma.tag.delete(args);
  }
}

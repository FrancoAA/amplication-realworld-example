import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { CommentService } from "./comment.service";
import { CreateCommentArgs } from "./CreateCommentArgs";
import { UpdateCommentArgs } from "./UpdateCommentArgs";
import { DeleteCommentArgs } from "./DeleteCommentArgs";
import { FindManyCommentArgs } from "./FindManyCommentArgs";
import { FindOneCommentArgs } from "./FindOneCommentArgs";
import { Comment } from "./Comment";
import { Article } from "../article/Article";
import { User } from "../user/User";

@graphql.Resolver(() => Comment)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CommentResolver {
  constructor(
    private readonly service: CommentService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Comment])
  @nestAccessControl.UseRoles({
    resource: "Comment",
    action: "read",
    possession: "any",
  })
  async comments(
    @graphql.Args() args: FindManyCommentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Comment[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Comment",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Comment, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Comment",
    action: "read",
    possession: "own",
  })
  async comment(
    @graphql.Args() args: FindOneCommentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Comment | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Comment",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Comment)
  @nestAccessControl.UseRoles({
    resource: "Comment",
    action: "create",
    possession: "any",
  })
  async createComment(
    @graphql.Args() args: CreateCommentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Comment> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Comment",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Comment"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        article: {
          connect: args.data.article,
        },

        author: {
          connect: args.data.author,
        },
      },
    });
  }

  @graphql.Mutation(() => Comment)
  @nestAccessControl.UseRoles({
    resource: "Comment",
    action: "update",
    possession: "any",
  })
  async updateComment(
    @graphql.Args() args: UpdateCommentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Comment | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Comment",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Comment"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          article: {
            connect: args.data.article,
          },

          author: {
            connect: args.data.author,
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Comment)
  @nestAccessControl.UseRoles({
    resource: "Comment",
    action: "delete",
    possession: "any",
  })
  async deleteComment(
    @graphql.Args() args: DeleteCommentArgs
  ): Promise<Comment | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Article, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Comment",
    action: "read",
    possession: "any",
  })
  async article(
    @graphql.Parent() parent: Comment,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Article | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Article",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .article();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Comment",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Comment,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .author();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}

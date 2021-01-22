import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { ArticleService } from "./article.service";
import { ArticleCreateInput } from "./ArticleCreateInput";
import { ArticleWhereInput } from "./ArticleWhereInput";
import { ArticleWhereUniqueInput } from "./ArticleWhereUniqueInput";
import { ArticleUpdateInput } from "./ArticleUpdateInput";
import { Article } from "./Article";
import { TagWhereInput } from "../tag/TagWhereInput";
import { Tag } from "../tag/Tag";

@swagger.ApiBasicAuth()
@swagger.ApiTags("articles")
@common.Controller("articles")
export class ArticleController {
  constructor(
    private readonly service: ArticleService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Article })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: ArticleCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Article> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Article",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Article"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        author: {
          connect: data.author,
        },
      },
      select: {
        author: {
          select: {
            id: true,
          },
        },

        body: true,
        createdAt: true,
        description: true,
        favoritesCount: true,
        id: true,
        slug: true,
        test: true,
        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Article] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: ArticleWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Article[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Article",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        author: {
          select: {
            id: true,
          },
        },

        body: true,
        createdAt: true,
        description: true,
        favoritesCount: true,
        id: true,
        slug: true,
        test: true,
        title: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Article })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: ArticleWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Article | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Article",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        author: {
          select: {
            id: true,
          },
        },

        body: true,
        createdAt: true,
        description: true,
        favoritesCount: true,
        id: true,
        slug: true,
        test: true,
        title: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Article })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body()
    data: ArticleUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Article | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Article",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Article"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          author: {
            connect: data.author,
          },
        },
        select: {
          author: {
            select: {
              id: true,
            },
          },

          body: true,
          createdAt: true,
          description: true,
          favoritesCount: true,
          id: true,
          slug: true,
          test: true,
          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Article })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: ArticleWhereUniqueInput
  ): Promise<Article | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          author: {
            select: {
              id: true,
            },
          },

          body: true,
          createdAt: true,
          description: true,
          favoritesCount: true,
          id: true,
          slug: true,
          test: true,
          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/tagList")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "read",
    possession: "any",
  })
  async findManyTagList(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Query() query: TagWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Tag[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Tag",
    });
    const results = await this.service.findOne({ where: params }).tagList({
      where: query,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/tagList")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  async createTagList(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body() body: ArticleWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      tagList: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Article",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Article"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/tagList")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  async updateTagList(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body() body: ArticleWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      tagList: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Article",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Article"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/tagList")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  async deleteTagList(
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body() body: ArticleWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      tagList: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Article",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Article"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}

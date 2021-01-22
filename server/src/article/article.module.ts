import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";
import { ArticleResolver } from "./article.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResolver],
  exports: [ArticleService],
})
export class ArticleModule {}

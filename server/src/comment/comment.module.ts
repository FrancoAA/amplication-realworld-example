import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { CommentResolver } from "./comment.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}

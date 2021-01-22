import { ArgsType, Field } from "@nestjs/graphql";
import { CommentWhereInput } from "./CommentWhereInput";

@ArgsType()
class FindManyCommentArgs {
  @Field(() => CommentWhereInput, { nullable: true })
  where?: CommentWhereInput;
}

export { FindManyCommentArgs };

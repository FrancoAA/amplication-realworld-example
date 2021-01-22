import { ArgsType, Field } from "@nestjs/graphql";
import { CommentWhereUniqueInput } from "./CommentWhereUniqueInput";

@ArgsType()
class FindOneCommentArgs {
  @Field(() => CommentWhereUniqueInput, { nullable: false })
  where!: CommentWhereUniqueInput;
}

export { FindOneCommentArgs };

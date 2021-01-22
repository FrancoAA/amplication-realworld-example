import { ArgsType, Field } from "@nestjs/graphql";
import { CommentWhereUniqueInput } from "./CommentWhereUniqueInput";

@ArgsType()
class DeleteCommentArgs {
  @Field(() => CommentWhereUniqueInput, { nullable: false })
  where!: CommentWhereUniqueInput;
}

export { DeleteCommentArgs };

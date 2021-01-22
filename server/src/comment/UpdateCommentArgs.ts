import { ArgsType, Field } from "@nestjs/graphql";
import { CommentWhereUniqueInput } from "./CommentWhereUniqueInput";
import { CommentUpdateInput } from "./CommentUpdateInput";

@ArgsType()
class UpdateCommentArgs {
  @Field(() => CommentWhereUniqueInput, { nullable: false })
  where!: CommentWhereUniqueInput;
  @Field(() => CommentUpdateInput, { nullable: false })
  data!: CommentUpdateInput;
}

export { UpdateCommentArgs };

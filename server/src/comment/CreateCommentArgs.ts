import { ArgsType, Field } from "@nestjs/graphql";
import { CommentCreateInput } from "./CommentCreateInput";

@ArgsType()
class CreateCommentArgs {
  @Field(() => CommentCreateInput, { nullable: false })
  data!: CommentCreateInput;
}

export { CreateCommentArgs };

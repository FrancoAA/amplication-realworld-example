import { ArgsType, Field } from "@nestjs/graphql";
import { ArticleWhereInput } from "./ArticleWhereInput";

@ArgsType()
class FindManyArticleArgs {
  @Field(() => ArticleWhereInput, { nullable: true })
  where?: ArticleWhereInput;
}

export { FindManyArticleArgs };

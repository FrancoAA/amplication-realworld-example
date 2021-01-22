import { ArgsType, Field } from "@nestjs/graphql";
import { ArticleWhereUniqueInput } from "./ArticleWhereUniqueInput";

@ArgsType()
class FindOneArticleArgs {
  @Field(() => ArticleWhereUniqueInput, { nullable: false })
  where!: ArticleWhereUniqueInput;
}

export { FindOneArticleArgs };

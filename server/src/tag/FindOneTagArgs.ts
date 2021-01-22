import { ArgsType, Field } from "@nestjs/graphql";
import { TagWhereUniqueInput } from "./TagWhereUniqueInput";

@ArgsType()
class FindOneTagArgs {
  @Field(() => TagWhereUniqueInput, { nullable: false })
  where!: TagWhereUniqueInput;
}

export { FindOneTagArgs };

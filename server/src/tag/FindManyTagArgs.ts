import { ArgsType, Field } from "@nestjs/graphql";
import { TagWhereInput } from "./TagWhereInput";

@ArgsType()
class FindManyTagArgs {
  @Field(() => TagWhereInput, { nullable: true })
  where?: TagWhereInput;
}

export { FindManyTagArgs };

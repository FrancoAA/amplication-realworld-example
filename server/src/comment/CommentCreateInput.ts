import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ArticleWhereUniqueInput } from "../article/ArticleWhereUniqueInput";
import { ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
@InputType()
class CommentCreateInput {
  @ApiProperty({
    required: true,
    type: ArticleWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ArticleWhereUniqueInput)
  @Field(() => ArticleWhereUniqueInput)
  article!: ArticleWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @Field(() => UserWhereUniqueInput)
  author!: UserWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  body!: string;
}
export { CommentCreateInput };

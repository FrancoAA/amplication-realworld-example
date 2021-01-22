import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ArticleWhereUniqueInput } from "../article/ArticleWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
@InputType()
class CommentUpdateInput {
  @ApiProperty({
    required: false,
    type: ArticleWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ArticleWhereUniqueInput)
  @IsOptional()
  @Field(() => ArticleWhereUniqueInput, {
    nullable: true,
  })
  article?: ArticleWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  author?: UserWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  body?: string;
}
export { CommentUpdateInput };

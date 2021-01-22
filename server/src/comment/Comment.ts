import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ArticleWhereUniqueInput } from "../article/ArticleWhereUniqueInput";
import { ValidateNested, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
@ObjectType()
class Comment {
  @ApiProperty({
    required: true,
    type: ArticleWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ArticleWhereUniqueInput)
  article!: ArticleWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  author!: UserWhereUniqueInput;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  body!: string;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Comment };

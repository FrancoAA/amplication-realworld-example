import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ArticleWhereUniqueInput } from "../article/ArticleWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import { ValidateNested, IsOptional, IsString, IsDate } from "class-validator";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
@InputType()
class CommentWhereInput {
  @ApiProperty({
    required: false,
    type: ArticleWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => ArticleWhereUniqueInput)
  @IsOptional()
  article?: ArticleWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
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
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt?: Date;
}
export { CommentWhereInput };

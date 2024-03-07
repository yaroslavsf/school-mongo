import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BlogCreateDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Awesome Blog',
    description: 'Title of a blog',
  })
  @IsString()
  public readonly title: string;
  @ApiProperty({
    type: String,
    required: true,
    example: 'Welcome to my blog, today Im going to describe...',
    description: 'Description of a blog',
  })
  @IsString()
  public readonly description: string;
}

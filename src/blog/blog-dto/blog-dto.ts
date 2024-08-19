import { IsString } from 'class-validator';

export class BlogDto {
  readonly id?: string;
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly link: string;
  @IsString()
  readonly date: string;
}

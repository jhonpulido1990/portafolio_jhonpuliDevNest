import { IsArray, IsString } from 'class-validator';

export class ProjectDto {
  readonly id?: string;
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsArray()
  readonly technologies: string[];
  @IsString()
  readonly role: string;
  @IsString()
  readonly imageUrl: string;
  @IsString()
  readonly demoLink?: string;
  @IsString()
  readonly repoLink?: string;
  @IsString()
  readonly videoLink?: string;
}

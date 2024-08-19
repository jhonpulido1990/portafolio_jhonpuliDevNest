import { IsArray, IsString } from 'class-validator';

export class ExperienceDto {
  readonly id?: string;
  @IsString()
  readonly company: string;
  @IsString()
  readonly position: string;
  @IsString()
  readonly duration: string;
  @IsArray()
  readonly responsabilities: string[];
  @IsArray()
  readonly achievements: string[];
  @IsString()
  readonly testimonial?: string;
}

export class ExperienceDto {
  readonly id?: string;
  readonly company: string;
  readonly position: string;
  readonly duration: string;
  readonly responsabilities: string[];
  readonly achievements: string[];
  readonly testimonial?: string;
}

export class ProjectDto {
  readonly id?: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: string[];
  readonly role: string;
  readonly imageUrl: string;
  readonly demoLink?: string;
  readonly repoLink?: string;
  readonly videoLink?: string;
}

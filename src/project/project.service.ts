import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { ProjectDto } from './project-dto/project-dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(projectDto: ProjectDto): Promise<Project> {
    const project = await this.projectRepository.create(projectDto);
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<ProjectDto[]> {
    const projects = await this.projectRepository.find();
    return projects;
  }

  async findOne(id: string): Promise<ProjectDto> {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, projectDto: Partial<ProjectDto>): Promise<void> {
    const result = await this.projectRepository.update(id, projectDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Response } from 'express';
import { ProjectDto } from './project-dto/project-dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @Res() response: Response,
    @Body() projectDto: ProjectDto,
  ) {
    try {
      const projectCreate = await this.projectService.create(projectDto);
      return response.status(HttpStatus.CREATED).json(projectCreate);
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAllProject(@Res() response: Response) {
    try {
      const projects = await this.projectService.findAll();
      return response.status(HttpStatus.OK).json(projects);
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  async findOneProject(@Res() response: Response, @Param('id') id: string) {
    try {
      const project = await this.projectService.findOne(id);
      if (!project) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Project not found' });
      }
      return response.status(HttpStatus.OK).json(project);
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Put(':id')
  async updateProject(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() projectDto: Partial<ProjectDto>,
  ) {
    try {
      await this.projectService.update(id, projectDto);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  async removeProject(@Res() response: Response, @Param('id') id: string) {
    try {
      await this.projectService.delete(id);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

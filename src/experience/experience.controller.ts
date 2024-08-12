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
import { Response } from 'express';
import { ExperienceService } from './experience.service';
import { ExperienceDto } from './experience-dto/experience-dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  async createExperience(
    @Res() response: Response,
    @Body() experienceDto: ExperienceDto,
  ) {
    try {
      const experienceCreate =
        await this.experienceService.create(experienceDto);
      return response.status(HttpStatus.CREATED).json(experienceCreate);
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAllExperience(@Res() response: Response) {
    try {
      const experiences = await this.experienceService.findAll();
      return response.status(HttpStatus.OK).json(experiences);
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  async findOneExperience(@Res() response: Response, @Param('id') id: string) {
    try {
      const experience = await this.experienceService.findOne(id);
      if (!experience) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Experience not found' });
      }
      return response.status(HttpStatus.OK).json(experience);
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Put(':id')
  async updateExperience(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() experienceDto: Partial<ExperienceDto>,
  ) {
    try {
      await this.experienceService.update(id, experienceDto);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  async removeExperience(@Res() response: Response, @Param('id') id: string) {
    try {
      await this.experienceService.delete(id);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

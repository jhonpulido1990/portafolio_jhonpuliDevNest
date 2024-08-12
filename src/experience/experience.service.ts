import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './experience.entity';
import { Repository } from 'typeorm';
import { ExperienceDto } from './experience-dto/experience-dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async create(experienceDTO: ExperienceDto): Promise<Experience> {
    const experience = this.experienceRepository.create(experienceDTO);
    return this.experienceRepository.save(experience);
  }

  async findAll(): Promise<ExperienceDto[]> {
    const experiences = await this.experienceRepository.find();
    return experiences;
  }

  async findOne(id: string): Promise<ExperienceDto> {
    const experience = await this.experienceRepository.findOneBy({ id });
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return experience;
  }

  async update(
    id: string,
    experienceDTO: Partial<ExperienceDto>,
  ): Promise<void> {
    const result = await this.experienceRepository.update(id, experienceDTO);
    if (result.affected === 0) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
  }

  async delete(id: string): Promise<void> {
    console.log('Deleting experience with ID:', id);
    const result = await this.experienceRepository.delete(id);
    console.log('Delete result:', result);
    if (result.affected === 0) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
  }
}

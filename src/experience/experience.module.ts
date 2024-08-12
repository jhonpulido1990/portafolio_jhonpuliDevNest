import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { Experience } from './experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}

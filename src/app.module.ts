import { Module } from '@nestjs/common';
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './project/project.module';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ExperienceModule,
    ProjectModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

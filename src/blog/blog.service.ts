import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { BlogDto } from './blog-dto/blog-dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(blogDto: BlogDto): Promise<Blog> {
    const blog = await this.blogRepository.create(blogDto);
    return this.blogRepository.save(blog);
  }

  async findAll(): Promise<BlogDto[]> {
    const blogs = await this.blogRepository.find();
    return blogs;
  }

  async findOne(id: string): Promise<BlogDto> {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException(`blog with ID ${id} not found`);
    }
    return blog;
  }

  async update(id: string, blogDto: Partial<BlogDto>): Promise<void> {
    const result = await this.blogRepository.update(id, blogDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.blogRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  }
}

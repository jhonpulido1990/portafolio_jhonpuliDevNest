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
import { BlogService } from './blog.service';
import { Response } from 'express';
import { BlogDto } from './blog-dto/blog-dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async createBlog(@Res() response: Response, @Body() blogDto: BlogDto) {
    try {
      const blogCreate = await this.blogService.create(blogDto);
      return response.status(HttpStatus.CREATED).json(blogCreate);
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
  @Get()
  async findAllBlog(@Res() response: Response) {
    try {
      const blogs = await this.blogService.findAll();
      return response.status(HttpStatus.OK).json(blogs);
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  async findOneBlog(@Res() response: Response, @Param('id') id: string) {
    try {
      const blog = await this.blogService.findOne(id);
      if (!blog) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `Blog with ID ${id} not found` });
      }
      return response.status(HttpStatus.OK).json(blog);
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Put(':id')
  async updateBlog(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() blogDto: Partial<BlogDto>,
  ) {
    try {
      await this.blogService.update(id, blogDto);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  async removeBlog(@Res() response: Response, @Param('id') id: string) {
    try {
      await this.blogService.delete(id);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

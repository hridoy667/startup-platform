import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {

  constructor(private readonly prisma:PrismaService){}

  async create(createPostDto: CreatePostDto, authorId: string) {
    try {
      const post = await this.prisma.post.create({
        data: {
          title: createPostDto.title,
          body: createPostDto.body,
          authorId: authorId
        }
      });
      return {
        success: true,
        message: "Post created successfully",
        data: post
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async findAll() {
    try {
      const posts = await this.prisma.post.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          likes: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      return {
        success: true,
        data: posts
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async findOne(id: string) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          likes: true
        }
      });
      
      if (!post) {
        return {
          success: false,
          message: 'Post not found'
        };
      }
      
      return {
        success: true,
        data: post
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.prisma.post.update({
        where: { id },
        data: {
          title: updatePostDto.title,
          body: updatePostDto.body
        }
      });
      return {
        success: true,
        data: post,
        message: 'Post updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.post.delete({
        where: { id }
      });
      return {
        success: true,
        message: 'Post deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
}

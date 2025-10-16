import { Prisma } from '@prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, userId, postId) {
    const comment = await this.prisma.comment.create({
      data: {
        commentBody: createCommentDto.comment,
        commentAuthorId: userId,
        postId,
      },
    });

    return{
      success:"true",
      data:comment
    }
  }

  async findAll(
    { skip, take }: { skip: number; take: number },
    userId: string,
  ) {
    const comment = await this.prisma.comment.findMany({
      take,
      skip,
      where: {
        commentAuthorId: userId,
      },
    });
    return comment
    
  }

  async findOne(commentId: string, userId: string) {
    try {
      const comment = await this.prisma.comment.findFirst({
        where: {
          id: commentId,
          commentAuthorId : userId,
        },
        
      });
      if(!comment) {
        throw new UnauthorizedException('You are not the owner of this comment');
      } 
      return {
        success:true,
        comment 
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update(id:string, updateCommentDto: UpdateCommentDto, userId:string) {

    const existingComment=await this.findOne(id,userId)

    const updatedComment=await this.prisma.comment.update({
    where:{
      id:existingComment.comment.id,
    },
      data:{
       commentBody: updateCommentDto.comment
      },   
    })
    return {
      success:"true",
      updatedComment
    }
  }

 async remove(id: string) {
    await this.prisma.comment.delete({
      where:{
        id:id
      }
    })
  }
}

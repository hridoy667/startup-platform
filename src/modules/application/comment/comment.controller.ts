import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':postId/comment')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId:string,
    @Req() req:any) {
    const userId=req.user.userId
    return this.commentService.create(createCommentDto,userId,postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Req() req:any,
    @Query('take', new ParseIntPipe({optional:true})) take?:number,
    @Query('skip', new ParseIntPipe({optional:true})) skip?:number,
  ) {
    const userId= await req.user.userId
    return this.commentService.findAll({take:take || 10,skip:skip||0}, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') commentId: string, @Req() req:any ) {
    const userId=req.user.userId
    return this.commentService.findOne(commentId,userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Req() req:any) {
    const userId= req.user.userId
    return this.commentService.update(id, updateCommentDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}

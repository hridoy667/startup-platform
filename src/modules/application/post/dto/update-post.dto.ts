import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
 import { IsNotEmpty } from "class-validator";

export class UpdatePostDto extends PartialType(CreatePostDto) {

    @IsNotEmpty()
    title:String
    
    @IsNotEmpty()
    body:String
    
}

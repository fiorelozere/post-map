import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
  ) {
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post()
  createPost(@Body() postDto: PostDto) {
    return this.postService.createPost(postDto);
  }

  @Post(':name')
  editPost(@Param('name') name: string, @Body() postDto: PostDto) {
    return this.postService.editPost(name, postDto);
  }

  @Delete(':name')
  deletePost(@Param('name') name: string) {
    return this.postService.deletePost(name);
  }
}

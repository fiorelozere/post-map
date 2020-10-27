import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { EntityRepository } from 'typeorm';

@Injectable()
@EntityRepository(Post)
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.getAllPosts();
  }

  async createPost(postDto: PostDto) {
    const { newName, newDescription, newLocation } = postDto;
    const post = {
      name: newName,
      description: newDescription,
      location: newLocation,
    };
    await this.postRepository.save(post);
    return post;
  }

  async editPost(name: string, postDto: PostDto) {
    const post = await this.postRepository.findByName(name);
    if (!post) {
      throw new Error(`Post with name ${name} not found`);
    }
    const { newName, newDescription, newLocation } = postDto;
    post.name = newName;
    post.description = newDescription;
    post.location = newLocation;

    await this.postRepository.save(post);
    return post;
  }

  async deletePost(name: string): Promise<void> {
    const post = await this.postRepository.findByName(name);
    if (!post) {
      throw new Error(`Post with name ${name} not found`);
    }
    await this.postRepository.delete(post);

  }
}

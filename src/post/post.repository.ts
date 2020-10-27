import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

  async getAllPosts(): Promise<Post[]> {
    return await this.find();
  }

  async findByName(name:string): Promise<Post> {
    return this.findOne({where: {name}});
  }


}

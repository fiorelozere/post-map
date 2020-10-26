import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModule = {
  database: process.env.DATABASE_URL,
  username: process.env.DATABASE_USER ,
  password: process.env.DATABASE_PASSWORD ,
  host: process.env.HOST,
  type: 'postgres',
  port: '5432',
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,

}

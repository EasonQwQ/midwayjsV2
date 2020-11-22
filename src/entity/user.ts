import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@EntityModel()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  openid: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updateDate: Date;

  // name: string;
  // description: string;
  // filename: string;
  // views: number;
  // isPublished: boolean;
}

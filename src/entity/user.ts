import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ActivityRecord } from './activityRecord';
@EntityModel()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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

  @Column({ default: 0 })
  point: number;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'json', nullable: true })
  userDetail: object;

  @OneToMany(() => ActivityRecord, activityRecord => activityRecord.user)
  activityRecords: ActivityRecord[];

  // name: string;
  // description: string;
  // filename: string;
  // views: number;
  // isPublished: boolean;
}

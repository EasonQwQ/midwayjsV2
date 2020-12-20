import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Activity } from './activity';
import { User } from './user';

@Index(['activity', 'user'], { unique: true })
@EntityModel()
export class ActivityRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  status: number;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  latitude: string;

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

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deleteDate: Date;

  @ManyToOne(() => Activity, activity => activity.activityRecords)
  activity: Activity;

  @ManyToOne(() => User, User => User.activityRecords)
  user: User;
}

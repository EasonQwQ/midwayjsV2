import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ActivityRecord } from './activityRecord';

@EntityModel()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  isGather: boolean;

  @Column({ nullable: true })
  participateEndDate: Date;

  @Column({ nullable: true })
  mainImg: string;

  @Column({ nullable: true })
  detailImg: string;

  @Column({ nullable: true })
  participateCount: number;

  @Column({ nullable: true })
  totalCount: number;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  meetingPlace: string;

  // 0自己乘车 1统一集合地点

  @Column({ nullable: true, default: 0 })
  transportMode: number;

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

  @OneToMany(() => ActivityRecord, activityRecord => activityRecord.activity)
  activityRecords: ActivityRecord[];
}

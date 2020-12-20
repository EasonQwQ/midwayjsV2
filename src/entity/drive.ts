import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 司机和蹭车的
 * 司机取消会导致测车的也被取消
 */
@EntityModel()
export class Drive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activityId: number;

  @Column()
  uid: number;

  // 蹭车0 开车1
  @Column()
  type: number;

  //  0加入   1 自己取消 2车主取消
  @Column()
  status: string;

  @Column()
  carId: number;

  // 假如开车的话最多能带多少个人
  @Column({ nullable: true })
  maxCount: number;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  latitude: string;

  @Column()
  isVerify: boolean;

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
}

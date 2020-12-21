import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // eslint-disable-next-line node/no-extraneous-import
} from 'typeorm';

@EntityModel()
export class PointFlow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: number;

  @Column()
  orderId: string;

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

  @Column({ nullable: true })
  point: number;

  @Column({ nullable: true })
  currentPoint: number;

  @Column()
  name: string;
}

import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@EntityModel()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column()
  uid: number;

  @Column()
  status: string;

  @Column()
  productId: string;

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

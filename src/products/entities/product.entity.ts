import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomerOrder } from '../../customer-orders/entities/customer-order.entity';

@Entity()
export class Product extends AbstractEntity {
  @Column()
  barcode!: string;

  @Column()
  description!: string;

  @Column()
  quantity!: number;

  @Column()
  price!: number;

  @ManyToOne(() => CustomerOrder, (order) => order.products, {
    onDelete: 'CASCADE',
  })
  order: CustomerOrder;
}

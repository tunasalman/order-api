import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class CustomerOrder extends AbstractEntity {
  @OneToOne(() => Customer, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => Product, (product) => product.order, {
    eager: true,
    onDelete: 'CASCADE',
  })
  products: Product[];
}

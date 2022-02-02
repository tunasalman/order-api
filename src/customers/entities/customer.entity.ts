import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Customer extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  address: string;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

  create(customer: CreateCustomerDto) {
    return this.customerRepo.save(customer);
  }

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne({ where: [{ id }] });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.customerRepo.update(id, updateCustomerDto);
    const customer = await this.findOne(id);
    return customer;
  }

  async remove(id: number) {
    await this.customerRepo.delete(id);
  }
}

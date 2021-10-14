import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['pets'],
    }); //SELECT * from user JOIN pets
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user; // Select * From USER WHERE user_id = id
    } catch (e) {
      throw e;
    }
  }

  createUser(name: string): Promise<User> {
    const newUser = this.userRepository.create({ name });
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);
    user.name = name;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);
    return await this.userRepository.remove(user);
  }

  customQuery(): any {
    return this.userRepository.createQueryBuilder('user').select('name');
  }

  getHello(): string {
    return 'Hello World!';
  }
}

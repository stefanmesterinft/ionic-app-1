import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    async findOne(email: string): Promise<User | undefined>{
        return this.usersRepository.findOne({email});
    }

    async register(user: User){
        return this.usersRepository.save(user);
    }

    async getUserWithAvatar(id:number){
        const queryBuilder = this.usersRepository.createQueryBuilder(
            'user',
        );

        const item = await queryBuilder
        .leftJoinAndMapOne(
            'user.avatar',
            'user.avatar',
            'file',
            'file.id = user.avatar',
        )
        .getOne();

    return item;
    }
}

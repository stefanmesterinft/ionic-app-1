import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FileEntity } from '../file/file.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User,FileEntity]), forwardRef(() => AuthModule)],
    providers: [UserService],
    exports:[UserService],
    controllers: [UserController]
})
export class UserModule {}

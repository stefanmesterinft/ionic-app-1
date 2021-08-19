import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './user/user.entity';
import { FileEntity } from './file/file.entity';
import { FileModule } from './file/file.module';


@Module({
  imports: [
    UserModule, 
    AuthModule,
    FileModule,
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'insightft',
        database: 'kiosk-app',
        entities: [User,FileEntity],
        synchronize: true,
        //autoLoadEntities: true,
      }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}

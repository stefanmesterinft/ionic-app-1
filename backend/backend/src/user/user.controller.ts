import { Controller, Get, Post, UseGuards, Request, Put, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthService } from "../auth/auth.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { FileEntity } from "../file/file.entity";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor( private authService: AuthService, 
    private userService: UserService, 
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(FileEntity) private fileRepository: Repository<FileEntity>) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any{    
      return this.authService.login(req.body);
    }

    @Post('register')
    register(@Request() req): any{    
        return this.userService.register(req.body);
    }

    @Put('upload-avatar')
    async uploadAvatar(@Request() req): Promise<any>{
        const user = await this.usersRepository.findOne(req.body.userId);
        if (user){
            user.avatar = req.body.fileId;
        }
        return this.usersRepository.save(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(        
        @Param('id') id: number,
    ){   
        const user = await this.userService.getUserWithAvatar(id);    
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('test')
    test(){
        console.log('asdf');
    }

}

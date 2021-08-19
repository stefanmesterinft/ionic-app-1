import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private UserService: UserService, private jwtService: JwtService){}

    async validateUser(email: string, password: string): Promise<any>{        
        const user = await this.UserService.findOne(email);
        console.log(user);
        

        if(user && user.password === password){
            const { password, email , ...rest} = user;
            return rest;
        }   
    }

    async login(user:any){
        const payload = {email: user.email, sub: user.id};
        return { access_token: this.jwtService.sign(payload)};
    }


}

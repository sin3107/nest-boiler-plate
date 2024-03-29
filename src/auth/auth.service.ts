import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    signUp(authCredentialsDto: AuthCredentialsDto): Promise <void> {
        return this.userRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise <{accessToken: string}> {
        const { username, password } = authCredentialsDto
        const user = await this.userRepository.findOne({ username })

        if(user && (await bcrypt.compare(password, user.password))) {

            const payload = { username }
            const accessToken = this.jwtService.sign(payload)

            return { accessToken }
        } else { 
            throw new UnauthorizedException('로그인에 실패하였습니다.')
        }
    }
}

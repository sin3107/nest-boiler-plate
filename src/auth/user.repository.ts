import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";

@EntityRepository(User)
export class UserRepository extends Repository <User> {

    jwtService: JwtService

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise <void> {
        const { username, password} = authCredentialsDto
        //const user = this.create({ username, password })

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({username, password: hashedPassword})

        try {
            await this.save(user)
        } catch(err) {
            if(err.code === '23505'){
                throw new ConflictException('중복된 유저명입니다.')
            }
            console.log('error', err)
        }
    }
}
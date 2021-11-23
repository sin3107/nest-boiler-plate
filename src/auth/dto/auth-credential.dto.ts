import { IsString, Matches, MaxLength, MinLength } from "class-validator"

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)

    @Matches(/^[a-zA-Z0-9~!@\#$%<>^&*]*$/, {
        message: '비밀번호는 특수문자, 영문자, 숫자만 사용가능합니다.'
    })
    password: string
}
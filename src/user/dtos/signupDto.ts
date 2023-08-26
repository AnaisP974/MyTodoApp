import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class signupDto {

    @IsString()
    @IsNotEmpty()
    @Length(3, 30)
    readonly username: string

    @IsEmail()
    readonly email: string
    
    @IsString()
    @IsNotEmpty()
    @Length(12, 30)
    readonly password: string
}
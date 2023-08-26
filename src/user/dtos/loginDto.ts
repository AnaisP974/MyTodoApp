import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {

    @IsEmail()
    readonly email: string
    
    @IsString()
    @IsNotEmpty()
    @Length(12, 30)
    readonly password: string
}
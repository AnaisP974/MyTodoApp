import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { signupDto } from './dtos/signupDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/signup")
    @Render("user/signup")
    getSignup(){}

    @Get("/login")
    @Render("user/login")
    getLogin(){}

    @Post("/signup")
    async postSignup(@Body() body: signupDto) {
        return {message : await this.userService.postSignup(body)}
    }
}

import { Controller, Post, HttpCode, UseGuards, Req, Body, Res, Get } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateAuthDto } from "./dto/create-auth.dto";
import { LocalAuthGuard } from "./localAuth.guard";
import RequestWithUser from "./requestWithUser.interface";
import { Response } from 'express';
import JwtAuthGuard from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() registrationData: CreateAuthDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() req: RequestWithUser) {
    const { user } = req;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    req.res.setHeader('Set-Cookie', cookie);
    return user;
  }


  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.sendStatus(200);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  authenticate(@Req() req: RequestWithUser) {
    const { user } = req;
    console.log("&&&&&&&&&&&&&&&&&&", user);
    user.password = undefined;
    return user;
  }

}

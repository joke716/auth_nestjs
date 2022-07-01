import { UserService } from "./user.service";
import {
  BadRequestException,
  Controller,
  Get, HttpException, HttpStatus, Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import JwtAuthGuard from "../auth/jwt-auth.guard";
import RequestWithUser from "../auth/requestWithUser.interface";
import { Express } from 'express';
import LocalFilesInterceptor from "../local-files/local-files.interceptor";
import { Role } from "./role.enum";
import { RoleGuard } from "./role.guard";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UserService,
  ) {}



  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'file',
    path: '/avatars',
    fileFilter: (request, file, callback) => {
      if (!file.mimetype.includes('image')) {
        return callback(new BadRequestException('Provide a valid image'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: Math.pow(1024, 2) // 1MB
    }
  }))
  async addAvatar(@Req() req: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addProfileImg(req.user.id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Get()
  @UseGuards(RoleGuard(Role.Admin))
  async getUsers(@Req() req: RequestWithUser) {
    // return this.usersService
    if (req.user.roles !== Role.Admin) {
      throw new HttpException('Wrong credentials provided', HttpStatus.NOT_ACCEPTABLE);
    }
    return this.usersService.getUsers(req);
  }

}
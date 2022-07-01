import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { LocalFilesModule } from "../local-files/local-files.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LocalFilesModule,
    ConfigModule
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UserModule {}

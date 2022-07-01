import { Module } from '@nestjs/common';
import LocalFilesService from "./local-files.service";
import { LocalFilesController } from './local-files.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalFile } from "./entities/local-file.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalFile]),
    ConfigModule
  ],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
  controllers: [LocalFilesController],
})
export class LocalFilesModule {}

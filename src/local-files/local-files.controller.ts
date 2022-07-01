import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  StreamableFile,
  Res,
} from '@nestjs/common';
import LocalFilesService from "./local-files.service";
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';


@Controller('local-files')
@UseInterceptors(ClassSerializerInterceptor)

export class LocalFilesController {
  constructor(
    private readonly localFilesService: LocalFilesService
  ) {}

  @Get(':id')
  async getDatabaseFileById(@Param('id') id: number, @Res({ passthrough: true }) response: Response) {
    const file = await this.localFilesService.getFileById(id);

    const stream = createReadStream(join(process.cwd(), file.path));

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    })
    return new StreamableFile(stream);
  }


}

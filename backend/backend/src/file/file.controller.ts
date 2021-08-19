import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileEntity } from './file.entity';
import { FileService } from './file.service';
import {
    ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadStorageFilter } from '../filters/upload-storage.filter';
import { UploadImageEntityFilter } from '../filters/upload-image.filter';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getFiles() {
      return this.fileService.getFiles();
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
      FileInterceptor('file', {
          storage: UploadStorageFilter(),
          fileFilter: UploadImageEntityFilter, 
      }),
  )
  async createFile(
      @UploadedFile() uploadedFile,
      @Body() fileData: FileEntity
  ){
      if (uploadedFile && uploadedFile.filename) {
        fileData.file = `file/${uploadedFile.filename}`;
      }

      if(!fileData.title){
          fileData.title = uploadedFile.filename;
      }

      const file = await this.fileService.createFile(fileData);

      if (!file) {
          throw new NotFoundException();
      }

      return file;
  }

}

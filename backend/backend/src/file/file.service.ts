import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';

@Injectable()
export class FileService {
    
    constructor(
        @InjectRepository(FileEntity)
        private filesRepository: Repository<FileEntity>,
      ) {}

    async getFiles(){
        return this.filesRepository.find();
    }

    async createFile(file){
        return this.filesRepository.save(file);
    }

}

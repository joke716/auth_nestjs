import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import LocalFilesService from "../local-files/local-files.service";
import { LocalFileDto } from "../local-files/localFile.dto";
import RequestWithUser from "../auth/requestWithUser.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private localFilesService: LocalFilesService,
  ) {}

  async getById(id: string) {
    const user = await this.usersRepository.findBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async addProfileImg(userId: string, fileData: LocalFileDto) {
    const imgProfile = await this.localFilesService.saveLocalFileData(fileData);
    await this.usersRepository.update(userId, {
      profileImgId: imgProfile.id,
    });
  }

  async getUsers(user: RequestWithUser) {

  }

}

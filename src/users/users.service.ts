import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOne(id: string){
    return this.userModel.findOne({
      _id: id
    }).exec()
  }

  create(userData: CreateUserDto): Promise<User>{
    return this.userModel.create(userData)
  }

  removeOne(id: string){
    return this.userModel.deleteOne({
      _id: id
    }).exec()
  }

  updateOne(id: string, userData: UpdateUserDto){
    return this.userModel.updateOne({_id: id}, userData).exec()
  }
}

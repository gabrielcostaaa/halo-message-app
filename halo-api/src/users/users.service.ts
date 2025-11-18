import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  /**
   * Cria um novo usuário no banco de dados
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  /**
   * Retorna todos os usuários cadastrados
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  /**
   * Busca um usuário por username
   */
  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  /**
   * Busca um usuário por ID
   */
  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  /**
   * Atualiza o status online do usuário
   */
  async updateOnlineStatus(
    userId: string,
    isOnline: boolean,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { isOnline, lastSeen: new Date() },
        { new: true },
      )
      .exec();
  }

  /**
   * Atualiza dados do usuário
   */
  async update(
    userId: string,
    updateData: Partial<CreateUserDto>,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(userId, updateData, { new: true })
      .exec();
  }
}

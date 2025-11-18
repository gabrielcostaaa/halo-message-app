import {
  Body,
  Controller,
  Post,
  ConflictException,
  UnauthorizedException,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { UsersService } from '../users/users.service';
import { registerBodySchema, RegisterBodyDto } from './dto/register.dto';
import { loginBodySchema, LoginBodyDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('register')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  async register(@Body() body: RegisterBodyDto) {
    const { name, username, password, avatar } = body;

    // Verificar se username já existe
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username já está em uso');
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    // Criar usuário
    const user = await this.usersService.create({
      name,
      username,
      password: hashedPassword,
      avatar: avatar || null,
    });

    // Gerar token JWT
    const accessToken = this.jwtService.sign({
      sub: user._id.toString(),
      username: user.username,
    });

    return {
      access_token: accessToken,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      },
    };
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(loginBodySchema))
  async login(@Body() body: LoginBodyDto) {
    const { username, password } = body;

    // Buscar usuário
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar token JWT
    const accessToken = this.jwtService.sign({
      sub: user._id.toString(),
      username: user.username,
    });

    return {
      access_token: accessToken,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        isOnline: user.isOnline,
      },
    };
  }
}

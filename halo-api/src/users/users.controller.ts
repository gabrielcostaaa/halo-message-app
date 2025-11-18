import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import type { UserPayload } from '../auth/jwt.strategy';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * GET /users - Retorna todos os usuários (rota protegida)
   */
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@CurrentUser() currentUser: UserPayload) {
    console.log('👤 Usuário autenticado:', currentUser);
    return this.usersService.findAll();
  }

  /**
   * GET /users/me - Retorna dados do usuário autenticado
   */
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@CurrentUser() currentUser: UserPayload) {
    const user = await this.usersService.findById(currentUser.sub);
    if (!user) {
      return { error: 'Usuário não encontrado' };
    }
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  /**
   * GET /users/:id - Retorna um usuário específico (rota protegida)
   */
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      return { error: 'Usuário não encontrado' };
    }
    // Remove a senha antes de retornar
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  /**
   * POST /users - Cria um novo usuário
   * NOTA: Use /auth/register para criar usuários com autenticação
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}

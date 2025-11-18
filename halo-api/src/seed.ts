import { NestFactory } from '@nestjs/core';
import { hash } from 'bcryptjs';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  console.log('🌱 Iniciando seed do banco de dados...\n');

  const defaultUsers = [
    {
      name: 'Alice Santos',
      username: 'alice',
      password: '123456',
      avatar: 'alice.png',
    },
    {
      name: 'Bruno Costa',
      username: 'bruno',
      password: '123456',
      avatar: 'bruno.png',
    },
    {
      name: 'Carlos Silva',
      username: 'carlos',
      password: '123456',
      avatar: 'carlos.png',
    },
    {
      name: 'Diana Oliveira',
      username: 'diana',
      password: '123456',
      avatar: 'diana.png',
    },
    {
      name: 'Eduardo Lima',
      username: 'eduardo',
      password: '123456',
      avatar: 'eduardo.png',
    },
  ];

  try {
    for (const userData of defaultUsers) {
      // Verificar se o usuário já existe
      const existingUser = await usersService.findByUsername(userData.username);

      if (existingUser) {
        // Atualizar avatar do usuário existente
        await usersService.update(String(existingUser._id), {
          avatar: userData.avatar,
        });
        console.log(
          `🔄 Usuário ${userData.username} atualizado com avatar: ${userData.avatar}`,
        );
        continue;
      }

      // Hash da senha antes de criar o usuário
      const hashedPassword = await hash(userData.password, 10);

      // Criar novo usuário
      await usersService.create({
        ...userData,
        password: hashedPassword,
      });
      console.log(
        `✅ Usuário ${userData.username} (${userData.name}) criado com sucesso!`,
      );
    }

    console.log('\n🎉 Seed concluído com sucesso!');
    console.log('\n📝 Credenciais de teste:');
    console.log('   Usuário: alice, bruno, carlos, diana ou eduardo');
    console.log('   Senha: 123456\n');
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error.message);
    process.exit(1);
  }

  await app.close();
  process.exit(0);
}

bootstrap();

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { MessagesController } from './messages.controller';
import { Message, MessageSchema } from './schemas/message.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UsersModule,
  ],
  controllers: [MessagesController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule { }

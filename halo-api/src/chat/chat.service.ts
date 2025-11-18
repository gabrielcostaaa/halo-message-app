import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) { }

  /**
   * Salva uma nova mensagem no banco de dados
   */
  async saveMessage(
    senderId: string,
    sendMessageDto: SendMessageDto,
  ): Promise<Message> {
    const message = new this.messageModel({
      sender: senderId,
      recipient: sendMessageDto.recipientId,
      content: sendMessageDto.content,
    });
    return message.save();
  }

  /**
   * Recupera o histórico de mensagens entre dois usuários
   * Retorna as mensagens ordenadas da mais antiga para a mais recente
   */
  async getMessageHistory(
    userId1: string,
    userId2: string,
    limit = 50,
  ): Promise<Message[]> {
    return this.messageModel
      .find({
        $or: [
          { sender: userId1, recipient: userId2 },
          { sender: userId2, recipient: userId1 },
        ],
      })
      .sort({ timestamp: 1 }) // Ordem crescente (mais antiga primeiro)
      .limit(limit)
      .exec();
  }

  /**
   * Recupera a última mensagem trocada entre dois usuários
   */
  async getLastMessage(
    userId1: string,
    userId2: string,
  ): Promise<Message | null> {
    return this.messageModel
      .findOne({
        $or: [
          { sender: userId1, recipient: userId2 },
          { sender: userId2, recipient: userId1 },
        ],
      })
      .sort({ timestamp: -1 }) // Mais recente primeiro
      .exec();
  }

  /**
   * Conta mensagens não lidas de um remetente específico
   */
  async countUnreadMessages(
    recipientId: string,
    senderId: string,
  ): Promise<number> {
    return this.messageModel
      .countDocuments({
        sender: senderId,
        recipient: recipientId,
        read: false,
      })
      .exec();
  }

  /**
   * Marca todas as mensagens de um remetente como lidas
   */
  async markMessagesAsRead(
    recipientId: string,
    senderId: string,
  ): Promise<number> {
    const result = await this.messageModel
      .updateMany(
        {
          sender: senderId,
          recipient: recipientId,
          read: false,
        },
        {
          $set: { read: true },
        },
      )
      .exec();

    return result.modifiedCount;
  }
}

import { Controller, Get, Param, Query, Patch, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UsersService } from '../users/users.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly chatService: ChatService,
    private readonly usersService: UsersService,
  ) { }

  /**
   * GET /messages/:userId - Recupera histórico de mensagens com um usuário específico
   * Query params:
   * - currentUserId: ID do usuário atual (temporário até JWT ser implementado)
   * - limit: Número máximo de mensagens (padrão: 50)
   * TODO: Adicionar JwtAuthGuard e extrair o userId atual do token
   */
  @Get(':userId')
  async getMessageHistory(
    @Param('userId') recipientId: string,
    @Query('currentUserId') currentUserId: string,
    @Query('limit') limit?: string,
  ) {
    if (!currentUserId) {
      return {
        error: 'currentUserId is required as query parameter',
        message: 'Until JWT is implemented, send currentUserId in query',
      };
    }

    const messageLimit = limit ? parseInt(limit, 10) : 50;
    const messages = await this.chatService.getMessageHistory(
      currentUserId,
      recipientId,
      messageLimit,
    );

    return messages;
  }

  /**
   * GET /messages/conversations/:userId - Recupera preview de todas as conversas do usuário
   * Retorna lista de usuários com última mensagem e contador de não lidas
   */
  @Get('conversations/:userId')
  async getConversations(@Param('userId') currentUserId: string) {
    // Buscar todos os usuários exceto o atual
    const allUsers = await this.usersService.findAll();
    const otherUsers = allUsers.filter(
      (user: any) => user._id.toString() !== currentUserId,
    );

    // Para cada usuário, buscar última mensagem e contador de não lidas
    const conversationsPromises = otherUsers.map(async (user: any) => {
      const lastMessage = await this.chatService.getLastMessage(
        currentUserId,
        user._id.toString(),
      );
      const unreadCount = await this.chatService.countUnreadMessages(
        currentUserId,
        user._id.toString(),
      );

      return {
        _id: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
        lastMessage: lastMessage?.content || null,
        lastMessageTime: lastMessage?.timestamp || null,
        lastMessageSender: lastMessage?.sender.toString() || null,
        unreadCount,
      };
    });

    const conversations = await Promise.all(conversationsPromises);

    // Ordenar por timestamp da última mensagem (mais recente primeiro)
    conversations.sort((a, b) => {
      if (!a.lastMessageTime) return 1;
      if (!b.lastMessageTime) return -1;
      return (
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
      );
    });

    return conversations;
  }

  /**
   * PATCH /messages/mark-read - Marca mensagens como lidas
   * Body:
   * - currentUserId: ID do usuário que está visualizando
   * - senderId: ID do usuário que enviou as mensagens
   */
  @Patch('mark-read')
  async markAsRead(
    @Body('currentUserId') currentUserId: string,
    @Body('senderId') senderId: string,
  ) {
    if (!currentUserId || !senderId) {
      return {
        error: 'currentUserId and senderId are required',
      };
    }

    const count = await this.chatService.markMessagesAsRead(
      currentUserId,
      senderId,
    );

    return {
      success: true,
      markedCount: count,
    };
  }
}

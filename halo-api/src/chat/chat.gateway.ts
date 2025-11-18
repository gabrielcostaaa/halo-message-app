import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UsersService } from '../users/users.service';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Mapa para armazenar userId => socketId
  private userSockets: Map<string, string> = new Map();

  constructor(
    private readonly chatService: ChatService,
    private readonly usersService: UsersService,
  ) { }

  /**
   * Evento disparado quando um cliente se conecta
   * TODO: Extrair e validar o token JWT do handshake quando a autenticação estiver pronta
   */
  async handleConnection(client: Socket) {
    try {
      // TODO: Implementar extração do token JWT e validação
      // const token = client.handshake.auth.token;
      // const userId = await this.authService.validateToken(token);

      // Por enquanto, vamos pegar o userId enviado diretamente pelo cliente
      const userId = client.handshake.auth.userId;

      if (!userId) {
        client.disconnect();
        return;
      }

      // Atualiza status online no banco
      await this.usersService.updateOnlineStatus(userId, true);

      // Armazena a associação userId -> socketId
      this.userSockets.set(userId, client.id);

      // Emite evento de status para todos os clientes conectados
      this.server.emit('user_status', {
        userId,
        isOnline: true,
      });

      console.log(`User ${userId} connected with socket ${client.id}`);
    } catch (error) {
      console.error('Connection error:', error);
      client.disconnect();
    }
  }

  /**
   * Evento disparado quando um cliente se desconecta
   */
  async handleDisconnect(client: Socket) {
    try {
      // Encontra o userId associado a este socket
      let disconnectedUserId: string | null = null;

      for (const [userId, socketId] of this.userSockets.entries()) {
        if (socketId === client.id) {
          disconnectedUserId = userId;
          this.userSockets.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        // Atualiza status offline no banco
        await this.usersService.updateOnlineStatus(disconnectedUserId, false);

        // Emite evento de status para todos os clientes conectados
        this.server.emit('user_status', {
          userId: disconnectedUserId,
          isOnline: false,
        });

        console.log(`User ${disconnectedUserId} disconnected`);
      }
    } catch (error) {
      console.error('Disconnection error:', error);
    }
  }

  /**
   * Evento enviado pelo cliente para enviar uma mensagem
   * Persiste a mensagem no MongoDB e emite para o destinatário e remetente
   */
  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // TODO: Pegar userId do token JWT validado
      const senderId = client.handshake.auth.userId;

      if (!senderId) {
        return { error: 'Unauthorized' };
      }

      // Salva a mensagem no banco (persistência síncrona conforme especificação)
      const savedMessage = await this.chatService.saveMessage(senderId, data);

      // Prepara o payload da mensagem para enviar via socket
      const messagePayload = {
        _id: (savedMessage as any)._id.toString(),
        sender: senderId,
        recipient: data.recipientId,
        content: data.content,
        timestamp: savedMessage.timestamp,
        read: false,
      };

      // Envia a mensagem para o destinatário (se estiver online)
      const recipientSocketId = this.userSockets.get(data.recipientId);
      if (recipientSocketId) {
        this.server.to(recipientSocketId).emit('new_message', messagePayload);
      }

      // Também envia para o próprio remetente (para sincronizar em múltiplos dispositivos)
      client.emit('new_message', messagePayload);

      // Confirma o envio para o remetente
      return { success: true, message: savedMessage };
    } catch (error) {
      console.error('Error sending message:', error);
      return { error: 'Failed to send message' };
    }
  }

  /**
   * Evento enviado pelo cliente para marcar mensagens como lidas
   */
  @SubscribeMessage('mark_as_read')
  async handleMarkAsRead(
    @MessageBody() data: { senderId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const recipientId = client.handshake.auth.userId;

      if (!recipientId || !data.senderId) {
        return { error: 'Invalid parameters' };
      }

      // Marca mensagens como lidas
      const count = await this.chatService.markMessagesAsRead(
        recipientId,
        data.senderId,
      );

      // Notifica o remetente que suas mensagens foram lidas
      const senderSocketId = this.userSockets.get(data.senderId);
      if (senderSocketId) {
        this.server.to(senderSocketId).emit('messages_read', {
          recipientId,
          count,
        });
      }

      return { success: true, markedCount: count };
    } catch (error) {
      console.error('Error marking messages as read:', error);
      return { error: 'Failed to mark messages as read' };
    }
  }
}

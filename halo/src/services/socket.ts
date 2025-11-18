import { io, Socket } from 'socket.io-client';
import { Platform } from 'react-native';

const SOCKET_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

class SocketService {
  private socket: Socket | null = null;
  private userId: string | null = null;

  /**
   * Conecta ao servidor Socket.IO
   * @param userId - ID do usuário autenticado
   */
  connect(userId: string): void {
    if (this.socket?.connected) {
      console.log('Socket já está conectado');
      return;
    }

    this.userId = userId;

    this.socket = io(SOCKET_URL, {
      auth: {
        userId,
      },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket conectado:', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket desconectado:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔥 Erro de conexão Socket:', error.message);
    });
  }

  /**
   * Desconecta do servidor Socket.IO
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
      console.log('Socket desconectado manualmente');
    }
  }

  /**
   * Envia uma mensagem para outro usuário
   */
  sendMessage(recipientId: string, content: string): void {
    if (!this.socket?.connected) {
      console.error('Socket não está conectado');
      return;
    }

    this.socket.emit('send_message', {
      recipientId,
      content,
    });
  }

  /**
   * Marca mensagens como lidas
   */
  markAsRead(senderId: string): void {
    if (!this.socket?.connected) {
      console.error('Socket não está conectado');
      return;
    }

    this.socket.emit('mark_as_read', {
      senderId,
    });
  }

  /**
   * Registra um listener para novas mensagens
   */
  onNewMessage(callback: (message: any) => void): void {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  /**
   * Registra um listener para mudanças de status de usuários
   */
  onUserStatus(callback: (data: { userId: string; isOnline: boolean }) => void): void {
    if (this.socket) {
      this.socket.on('user_status', callback);
    }
  }

  /**
   * Registra um listener para quando mensagens são lidas
   */
  onMessagesRead(callback: (data: { recipientId: string; count: number }) => void): void {
    if (this.socket) {
      this.socket.on('messages_read', callback);
    }
  }

  /**
   * Remove um listener de evento
   */
  off(event: string, callback?: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  /**
   * Verifica se o socket está conectado
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Retorna o ID do usuário conectado
   */
  getUserId(): string | null {
    return this.userId;
  }
}

export default new SocketService();

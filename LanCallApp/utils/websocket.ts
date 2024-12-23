import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

const SOCKET_URL = 'http://192.168.1.6:8080/ws'; // Thay bằng URL của server Spring Boot

type ChatMessage = {
  type: 'CHAT' | 'JOIN' | 'LEAVE';
  content: string;
  sender: string;
};

export const connectWebSocket = (
  onMessageReceived: (message: ChatMessage) => void,
): { sendMessage: (destination: string, body: ChatMessage) => void; disconnect: () => void } => {
  const client = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    onConnect: () => {
      console.log('Connected to WebSocket');
      client.subscribe('/topic/public', (message: IMessage) => {
        const chatMessage: ChatMessage = JSON.parse(message.body);
        onMessageReceived(chatMessage);
      });
    },
    onDisconnect: () => {
      console.log('Disconnected from WebSocket');
    },
  });

  client.activate();

  const sendMessage = (destination: string, body: ChatMessage) => {
    client.publish({
      destination,
      body: JSON.stringify(body),
    });
  };

  const disconnect = () => client.deactivate();

  return { sendMessage, disconnect };
};

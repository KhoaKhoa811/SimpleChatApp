import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { connectWebSocket } from '../utils/websocket';
import {useLocalSearchParams } from 'expo-router';

type ChatMessage = {
  type: 'CHAT' | 'JOIN' | 'LEAVE';
  content: string;
  sender: string;
};

const ChatScreen: React.FC = () => {
  const { username } = useLocalSearchParams();
  const userNameString = Array.isArray(username) ? username[0] : username;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [client, setClient] = useState<{
    sendMessage: (destination: string, body: ChatMessage) => void;
    disconnect: () => void;
  } | null>(null);

  useEffect(() => {
    const { sendMessage, disconnect } = connectWebSocket((newMessage: ChatMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    setClient({ sendMessage, disconnect });

    return () => {
      disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (client && message.trim()) {
      client.sendMessage('/app/chat.sendMessage', {
        type: 'CHAT',
        content: message.trim(),
        sender: userNameString, 
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.message}>
            <Text style={styles.sender}>{item.sender}: </Text>
            {item.content}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  message: { padding: 5, fontSize: 16 },
  sender: { fontWeight: 'bold', color: '#007AFF' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default ChatScreen;

// app/chat/[username].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ChatScreen: React.FC = () => {
  const { username } = useLocalSearchParams(); // Lấy username từ URL params
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: username, content: message },
      ]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Welcome, {username}</Text>
      
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text>{item.sender}: {item.content}</Text>
          </View>
        )}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default ChatScreen;

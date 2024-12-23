// app/index.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();  // Sử dụng useRouter từ expo-router để điều hướng

  const handleLogin = () => {
    if (username.trim()) {
      // Điều hướng tới màn hình chat và truyền username
      router.push(`/chat?username=${username}`);
    } else {
      alert('Please enter a username');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Join Chat" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default LoginScreen;

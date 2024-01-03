import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signUp = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Get the UID
      const uid = user.uid;

      // Update the user's profile with the entered name
      await updateProfile(user, { displayName: username });

      const response = await fetch('http://192.168.1.237:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, name, email, username }),
      });
      if (response.ok) {
        await response.json();
      } else {
        console.error('Server responded with status', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Register</Text>
        <TextInput autoCapitalize="none" onChangeText={setName} label="name" />
        <TextInput
          autoCapitalize="none"
          onChangeText={setUsername}
          label="username"
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={setEmail}
          label="email"
        />
        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          label="password"
        />
        <Button onPress={signUp}>Sign Up</Button>
      </View>
    </SafeAreaView>
  );
}

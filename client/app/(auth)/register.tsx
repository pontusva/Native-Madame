import { View, Text } from '../../components/Themed';
import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { TextInput, Button } from 'react-native-paper';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default () => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

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
      await updateProfile(user, { displayName: name });

      const response = await fetch('http://192.168.1.237:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, name, email, username }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Server responded with status', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
        }}>
        <Text>Register</Text>
        <TextInput autoCapitalize="none" onChangeText={setName} label="Name" />
        <TextInput
          autoCapitalize="none"
          onChangeText={setEmail}
          label="Email"
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={setUsername}
          label="Username"
        />
        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          label="Password"
        />
        <Button onPress={signUp}>Sign Up</Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

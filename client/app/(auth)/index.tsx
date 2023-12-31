import { View } from '../../components/Themed';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log('User signed in:', user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  return (
    <View>
      <SafeAreaView>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <Button onPress={signIn}> Sign In</Button>
      </SafeAreaView>
    </View>
  );
};

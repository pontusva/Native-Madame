import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

export default function SettingsDrawer() {
  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      alert('Logged out successfully');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Button onPress={logout}>Sign Out</Button>
    </View>
  );
}

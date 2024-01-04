import { View, Text, SafeAreaView } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type StackParamList = {
  'Alert Profile': { petId: string };
};
type PetProfileRouteProp = RouteProp<StackParamList, 'Alert Profile'>;

interface PetProfileProps {
  route?: PetProfileRouteProp;
}

export default function PetAlertProfile({ route }: PetProfileProps) {
  if (!route) return null;
  const { petId } = route.params;

  console.log(petId);

  return (
    <SafeAreaView>
      <View>
        <Text>PetAlertProfile</Text>
      </View>
    </SafeAreaView>
  );
}

import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type StackParamList = {
  'Pet Profile': { petId: string };
};
type PetProfileRouteProp = RouteProp<StackParamList, 'Pet Profile'>;

interface PetProfileProps {
  route: PetProfileRouteProp;
}

export default function PetProfile({ route }: PetProfileProps) {
  const { petId } = route.params;

  console.log(petId);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pet Profile</Text>
    </View>
  );
}

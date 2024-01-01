import { View, Image, Text, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';

type RootStackParamList = {
  'Find Pet': undefined;
  'Pet Profile': { petId: string };
};

type Props = NativeStackScreenProps<RootStackParamList>;

interface Pet {
  images: {
    id: number;
    image_name: string;
    user_id: number;
    pet_id: number;
    created_at: string;
    updated_at: string;
  }[];
}

export default function FindPet({ navigation }: Props) {
  const [pets, setPets] = useState<Pet | null>(null);

  const getPets = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.237:8080/user-pet-images/${
          getAuth().currentUser?.uid as string
        }`
      );
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      getPets();
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your pets</Text>
        {!!pets &&
          pets.images.map((pet: any) => {
            return (
              <View>
                <Button
                  onPress={() => {
                    navigation.navigate('Pet Profile', {
                      petId: pet.id,
                    });
                  }}>
                  {pet.pet_name}
                </Button>

                <Image
                  key={pet.image_name}
                  style={{ width: 200, height: 200, borderRadius: 20 }}
                  source={{
                    uri: `http://192.168.1.237:8080/static/${pet.image_name}`,
                  }}
                />
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}

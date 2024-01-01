import { View, Image, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

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

export default function FindPet() {
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
    getPets();
  }, []);
  console.log(pets);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Your pets</Text>
      {!!pets &&
        pets.images.map((pet: any) => {
          console.log(pet.image_name);
          return (
            <Image
              key={pet.id}
              style={{ width: 200, height: 200, borderRadius: 20 }}
              source={{
                uri: `http://192.168.1.237:8080/static/${pet.image_name}`,
              }}
            />
          );
        })}
    </View>
  );
}

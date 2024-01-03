import { View, Text, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import * as Location from 'expo-location';
import { LocationGeocodedAddress } from 'expo-location';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

type StackParamList = {
  'Pet Profile': { petId: string };
};
type PetProfileRouteProp = RouteProp<StackParamList, 'Pet Profile'>;

interface PetProfileProps {
  route: PetProfileRouteProp;
}

interface SpecificPet {
  specificPet: {
    id: number;
    name: string;
    type: string;
    description: string;
    date_lost: string;
    owner_id: string;
    created_at: string;
    pet_id: number;
    user_uid: string;
    location: string;
    seen_at: string;
    image_name: string;
  }[];
}

export default function PetProfile({ route }: PetProfileProps) {
  const [petProfile, setPetProfile] = useState<SpecificPet | null>(null);
  const [location, setLocation] = useState<LocationGeocodedAddress[] | null>(
    null
  );
  const { petId } = route.params;
  const userid = getAuth().currentUser?.uid as string;

  const getPet = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.237:8080/pet-profile/${petId}/${userid}`
      );
      const data = await response.json();
      setPetProfile(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPet().then(async data => {
      const loc = await Location.reverseGeocodeAsync(
        JSON.parse(data.specificPet[0].location)
      );
      setLocation(loc);
    });
  }, []);

  console.log(petProfile?.specificPet[0].image_name, location);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!!petProfile && !!location && (
        <>
          <Text>{petProfile.specificPet[0].name}</Text>
          <Text>{petProfile.specificPet[0].type}</Text>
          <Text>{petProfile.specificPet[0].description}</Text>
          <View>
            <Text>
              Försvinnande datum:{' '}
              {petProfile.specificPet[0].date_lost.split('T')[0]}
            </Text>
          </View>
          <Image
            style={{ width: 200, height: 200, borderRadius: 20 }}
            source={{
              uri: `http://192.168.1.237:8080/static/${petProfile.specificPet[0].image_name}`,
            }}
          />
          {location.map((loc, index) => {
            return (
              <View key={index}>
                <Text>Senast sedd:</Text>
                <Text>
                  {loc.name} {loc.street}
                </Text>
                <Text>
                  {loc.city} {loc.postalCode}
                </Text>

                <Text>{loc.country}</Text>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
}

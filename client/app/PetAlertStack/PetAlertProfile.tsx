import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

// Get the screen width
const screenWidth = Dimensions.get('window').width;

type StackParamList = {
  'Alert Profile': { petId: string };
};
type PetProfileRouteProp = RouteProp<StackParamList, 'Alert Profile'>;

interface PetProfileProps {
  route?: PetProfileRouteProp;
}

interface GetComments {
  comments: {
    id: number;
    content: string;
    created_at: string;
    parent_comment_id: number;
    thread_id: number;
    user_uid: string;
    username: string;
  }[];
}

interface AlertProfile {
  profile: {
    id: string;
    name: string;
    type: string;
    description: string;
    date_lost: string;
    owner_uid: string;
    created_at: string;
    image_name: string;
    thread_id: number;
  }[];
}

export default function PetAlertProfile({ route }: PetProfileProps) {
  if (!route) return null;

  const { petId } = route.params;
  const [petAlertProfile, setPetAlertProfile] = useState<AlertProfile | null>(
    null
  );

  const getAlertProfile = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.237:8080/pet-alert-profile/${petId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setPetAlertProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCommunitySearcher = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.237:8080/pet-alert/add-community-searcher',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pet_id: petId,
            user_uid: getAuth().currentUser?.uid,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAlertProfile();
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      {petAlertProfile &&
        petAlertProfile.profile.map(pet => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
              key={pet.id}>
              <Text>{pet.type}</Text>
              <Text>{pet.date_lost.split('T')[0]}</Text>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                  }}
                  source={{
                    uri: `http://192.168.1.237:8080/static/${pet.image_name}`,
                  }}
                />
              </View>
            </View>
          );
        })}

      {petAlertProfile && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <Text>
            Har någon sett{' '}
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {petAlertProfile.profile[0].name}
            </Text>
            ?
          </Text>
          <Text>{petAlertProfile.profile[0].description}</Text>
          <Button onPress={addToCommunitySearcher}>
            Klicka här om du sett {petAlertProfile.profile[0].name}
          </Button>
        </View>
      )}
    </View>
  );
}

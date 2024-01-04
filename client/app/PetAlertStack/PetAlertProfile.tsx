import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import Comments from '../components/PetAlertProfile/Comments';
import { RouteProp } from '@react-navigation/native';

import { Dimensions } from 'react-native';

// Get the screen width
const screenWidth = Dimensions.get('window').width;

type StackParamList = {
  'Alert Profile': { petId: string };
};
type PetProfileRouteProp = RouteProp<StackParamList, 'Alert Profile'>;

interface PetProfileProps {
  route?: PetProfileRouteProp;
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

  useEffect(() => {
    getAlertProfile();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="position">
      <ScrollView>
        <SafeAreaView>
          {petAlertProfile &&
            petAlertProfile.profile.map(pet => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={pet.id}>
                  <Text>{pet.name}</Text>
                  <Text>{pet.type}</Text>
                  <Text>{pet.description}</Text>
                  <Text>{pet.date_lost.split('T')[0]}</Text>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        width: screenWidth,
                        height: 400,
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
            <Comments threadId={petAlertProfile?.profile[0].thread_id} />
          )}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

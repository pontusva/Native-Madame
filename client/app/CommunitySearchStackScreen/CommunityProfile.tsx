import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import CommunityProfileThreads from '../components/modals/CommunityProfileThreads';
import { set } from 'react-hook-form';

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

interface Thread {
  thread_id: number;
  comment_id: number;
}

export default function CommunitySearchesProfile({ route }: PetProfileProps) {
  if (!route) return null;

  const { petId } = route.params;
  const [comments, setComments] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [thread, setThread] = useState<Thread | null>(null);
  const [petAlertProfile, setPetAlertProfile] = useState<AlertProfile | null>(
    null
  );

  const [retrievedComments, setRetrievedComments] =
    useState<GetComments | null>(null);

  const handleComments = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.237:8080/pet-alert-profile/comments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: comments,
            thread_id: petAlertProfile?.profile[0].thread_id,
            user_uid: getAuth().currentUser?.uid,
          }),
        }
      );

      if (response.ok && petAlertProfile) {
        getComments(petAlertProfile?.profile[0].thread_id);
        setComments('');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      getComments(data.profile[0].thread_id);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (threadId: number) => {
    // Add threadId parameter
    const response = await fetch(
      `http://192.168.1.237:8080/pet-alert-profile/comments/${threadId}`
    );
    const data = await response.json();
    setRetrievedComments(data);
  };

  useEffect(() => {
    getAlertProfile();
  }, []);
  return (
    <SafeAreaView>
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
        </View>
      )}

      <View
        style={{
          marginVertical: 20,
        }}>
        <TextInput
          label="Skriv något"
          value={comments}
          onChangeText={text => setComments(text)}
          onSubmitEditing={() => comments !== '' && handleComments()}
        />
      </View>
      <CommunityProfileThreads
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        thread={thread}
      />
      <ScrollView
        style={{
          height: 200,
        }}>
        {retrievedComments &&
          retrievedComments.comments.map(comment => {
            return (
              <Pressable
                onPress={() => {
                  setThread({
                    thread_id: comment.thread_id,
                    comment_id: comment.id,
                  });

                  setModalVisible(true);
                }}>
                <View
                  key={comment.id}
                  style={{
                    padding: 10,
                    margin: 10,
                    borderWidth: 0.5,
                    borderColor: '#000',
                    borderRadius: 5,
                    backgroundColor: '#f8f8f8',
                  }}>
                  <Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'orange',
                      }}>
                      {comment.username}:
                    </Text>{' '}
                    {comment.content}
                  </Text>
                </View>
              </Pressable>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

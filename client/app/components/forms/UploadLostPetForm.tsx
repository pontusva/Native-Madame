import { useState } from 'react';

import { getAuth } from 'firebase/auth';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLastSeenLocationStore } from '../../../zustand/stores';
import { Button } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import ImagePickerMissingPet from '../imagePicker/ImagePicker';

type RootStackParamList = {
  'Last Seen Location': undefined;
};

interface Inputs {
  name: string;
  type: string;
  description: string;
  date_lost: string;
  owner_uid: string;
}
interface Photo {
  fileName: string;
  type: string;
  uri: string;
}

interface Image {
  fileName: string;
  type: string;
  uri: string;
}

const createFormData = (photo: Photo) => {
  const data: any = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  } as any);

  return data;
};

export default function UploadLostPetForm({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const [inputData, setInputData] = useState<Inputs>({
    name: '',
    type: '',
    description: '',
    date_lost: '',
    owner_uid: getAuth().currentUser?.uid as string,
  });

  const [image, setImage] = useState<Image | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const lastSeenLocation = useLastSeenLocationStore(state => state.lastSeen);
  console.log(lastSeenLocation);
  const handleInputChange = (field: string) => (value: string) => {
    setInputData(prevState => ({ ...prevState, [field]: value }));
  };

  const uploadImage = async () => {
    try {
      if (image) {
        const formData = createFormData(image);

        Object.entries(inputData).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append('latLng', lastSeenLocation);

        setInputData({
          name: '',
          type: '',
          description: '',
          date_lost: '',
          owner_uid: getAuth().currentUser?.uid as string,
        });
        console.log(inputData);
        const uploadResponse = await fetch(
          'http://192.168.1.237:8080/upload/pet',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          }
        );
        console.log(formData);
        if (!uploadResponse.ok) {
          throw new Error('Upload failed');
        }
      } else {
        console.error('No image to upload');
        setImageUploadError('Glöm inte välja en bild');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Button title="Ladda upp" onPress={uploadImage} />

          <TextInput
            value={inputData.name}
            onChange={event =>
              handleInputChange('name')(event.nativeEvent.text)
            }
            label="Namn"
          />
          <TextInput
            value={inputData.type}
            onChange={event =>
              handleInputChange('type')(event.nativeEvent.text)
            }
            label="Typ av djur"
          />
          <TextInput
            value={inputData.date_lost}
            onChange={event =>
              handleInputChange('date_lost')(event.nativeEvent.text)
            }
            label="Försvinnande datum"
          />
          <TextInput
            value={inputData.description}
            onChange={event =>
              handleInputChange('description')(event.nativeEvent.text)
            }
            label="Beskrivning"
            multiline={true}
            numberOfLines={4}
          />
          {imageUploadError && (
            <View
              style={{
                backgroundColor: 'white',
                padding: 12,
                borderRadius: 12,
              }}>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                }}>
                {imageUploadError}
              </Text>
            </View>
          )}
          <ImagePickerMissingPet image={image} setImage={setImage} />
          <Button
            title="Map"
            onPress={() => navigation.navigate('Last Seen Location')}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

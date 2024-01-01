import { useState } from 'react';

import { getAuth } from 'firebase/auth';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import { Button } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import ImagePickerMissingPet from '../imagePicker/ImagePicker';

type Inputs = {
  name: string;
  type: string;
  description: string;
  date_lost: string;
  owner_uid: string;
};
type Photo = {
  fileName: string;
  type: string;
  uri: string;
};

const createFormData = (photo: Photo) => {
  const data: any = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  } as any);

  return data;
};

export default function UploadLostPetForm() {
  const [inputData, setInputData] = useState<Inputs>({
    name: '',
    type: '',
    description: '',
    date_lost: '',
    owner_uid: getAuth().currentUser?.uid as string,
  });

  const [image, setImage] = useState<{
    fileName: string;
    type: string;
    uri: string;
  } | null>(null);

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

        if (!uploadResponse.ok) {
          throw new Error('Upload failed');
        }
      } else {
        console.error('No image to upload');
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
          <ImagePickerMissingPet image={image} setImage={setImage} />
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

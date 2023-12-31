import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import ImagePickerMissingPet from '../imagePicker/ImagePicker';
import { SafeAreaView } from 'react-native-safe-area-context';
type Inputs = {
  name: string;
  type: string;
  description: string;
  date_lost: string;
  owner_uid: string;
};

export default function UploadLostPetForm() {
  const [inputData, setInputData] = useState<Inputs>({
    // Update the type of inputData
    name: '',
    type: '',
    description: '',
    date_lost: '',
    owner_uid: getAuth().currentUser?.uid as string,
  });
  console.log(inputData);
  const handleInputChange = (key: keyof Inputs) => (text: string) => {
    setInputData(prevState => ({ ...prevState, [key]: text }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView>
          <ImagePickerMissingPet inputData={inputData} />
          <TextInput
            onChangeText={text => handleInputChange('name')(text)}
            label="Namn"
          />

          <TextInput
            onChangeText={text => handleInputChange('type')(text)}
            label="Typ av djur"
          />

          <TextInput
            onChangeText={text => handleInputChange('date_lost')(text)}
            label="Försvinnande datum"
          />

          <TextInput
            onChangeText={text => handleInputChange('description')(text)}
            label="Beskrivning"
            multiline={true}
            numberOfLines={4}
          />

          <Button>Skicka</Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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

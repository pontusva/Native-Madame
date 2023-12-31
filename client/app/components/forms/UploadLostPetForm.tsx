import { useForm, SubmitHandler } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView>
          <ImagePickerMissingPet />
          <TextInput label="Namn" {...register('name')} />

          <TextInput
            label="Typ av djur"
            {...register('type', { required: true })}
          />

          {errors.type && <Text>This field is required</Text>}

          <TextInput
            label="Försvinnande datum"
            {...register('date_lost', { required: true })}
          />
          {errors.date_lost && <Text>This field is required</Text>}

          <TextInput
            label="Beskrivning"
            multiline={true}
            numberOfLines={4}
            {...register('description', { required: true })}
          />
          {errors.description && <Text>This field is required</Text>}

          <Button onPress={handleSubmit(onSubmit)}>Skicka</Button>
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

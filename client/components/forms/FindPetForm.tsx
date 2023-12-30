import { Text, View } from '../Themed';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import PickImage from '../imageUploads/PickImage';

export default () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
        }}>
        <PickImage />
        <TextInput label="Namet på husdjuret" />
      </View>
    </TouchableWithoutFeedback>
  );
};

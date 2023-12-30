import { Text, View } from '../Themed';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';

export default () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
        }}>
        <TextInput
          style={{
            backgroundColor: '#fff',
            flex: 1,
          }}
          label="Namet på husdjuret"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

import 'react-native-get-random-values';
import { Dispatch, SetStateAction } from 'react';
import { Button, Image, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

type Photo = {
  fileName: string;
  type: string;
  uri: string;
};

interface Props {
  image: Photo | null;
  setImage: Dispatch<SetStateAction<Photo | null>>;
}

export default function ImagePickerMissingPet({ image, setImage }: Props) {
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      delete (result as any).cancelled;

      if (!result.canceled) {
        setImage({
          fileName: `${uuidv4()}`,
          type: 'image/jpeg',
          uri: result.assets[0].uri,
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
      )}
    </View>
  );
}

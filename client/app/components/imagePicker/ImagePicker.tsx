import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import { SafeAreaView } from 'react-native-safe-area-context';

const createFormData = (
  photo: { fileName: string; type: string; uri: string },
  body = {}
) => {
  const data = new FormData();

  const photoBlob = new Blob([photo.uri], { type: photo.type });
  data.append('photo', photoBlob, photo.fileName);

  Object.keys(body).forEach(key => {
    const createFormData = (
      photo: { fileName: string; type: string; uri: string },
      body: Record<string, string> = {}
    ) => {
      const data = new FormData();

      const photoBlob = new Blob([photo.uri], { type: photo.type });
      data.append('photo', photoBlob, photo.fileName);

      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });

      return data;
    };
  });

  return data;
};

export default function ImagePickerMissingPet() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      delete (result as any).cancelled;

      if (!result.canceled) {
        setImage(result.assets[0].uri);

        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        console.log(result);

        const photo = {
          fileName: `${uuidv4()}.jpg`,
          type: 'image/jpeg',
          uri: result.assets[0].uri,
        };
        const formData = createFormData(photo);

        console.log({ formData });

        const uploadResponse = await fetch('https://your-server.com/upload', {
          method: 'POST',
          body: formData,
        });
        if (!uploadResponse.ok) {
          throw new Error('Upload failed');
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}

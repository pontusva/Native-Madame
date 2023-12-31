import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

type Photo = {
  fileName: string;
  type: string;
  uri: string;
};

const createFormData = (photo: Photo, body = {} as any) => {
  const data: any = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  } as any);

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export default function ImagePickerMissingPet() {
  const [image, setImage] = useState<{
    fileName: string;
    type: string;
    uri: string;
  } | null>(null);

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

  const uploadImage = async () => {
    try {
      if (image) {
        const formData = createFormData(image);
        console.log(formData);
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
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="upload image" onPress={uploadImage} />
    </View>
  );
}

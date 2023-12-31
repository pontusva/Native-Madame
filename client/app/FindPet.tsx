import { View, Image, Text } from 'react-native';

export default function FindPet() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Your pets</Text>
      <Image
        style={{ width: 200, height: 200, borderRadius: 20 }}
        source={{
          uri: 'http://192.168.1.237:8080/static/671b8ee5-8ca3-41a1-b773-65b9edcc533a.jpg',
        }}
      />
    </View>
  );
}

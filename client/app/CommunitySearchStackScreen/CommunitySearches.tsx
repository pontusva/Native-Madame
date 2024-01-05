import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth } from 'firebase/auth';

interface Community {
  cs: {
    id: number;
    name: string;
    description: string;
    url: string;
    created_at: string;
    updated_at: string;
  }[];
}

export default function CommunitySearches({ navigation }: any) {
  const [community, setCommunity] = useState<Community | null>(null);

  const getCommunity = async () => {
    const respons = await fetch(
      `http://192.168.1.237:8080/community-searcher/${
        getAuth().currentUser?.uid
      }`
    );

    const data = await respons.json();

    setCommunity(data);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      getCommunity();
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {community &&
        community.cs.map((item: any) => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                borderRadius: 20,
                margin: 20,
              }}
              key={item.id}>
              <Button
                onPress={() => {
                  navigation.navigate('Community Profile', {
                    petId: item.id,
                  });
                }}>
                {item.name}
              </Button>
              <Image
                style={{ width: 200, height: 200, borderRadius: 20 }}
                source={{
                  uri: `http://192.168.1.237:8080/static/${item.image_name}`,
                }}
              />
            </View>
          );
        })}
    </View>
  );
}

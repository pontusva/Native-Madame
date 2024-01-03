import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

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

export default function CommunitySearches() {
  const [community, setCommunity] = useState<Community | null>(null);

  const getCommunity = async () => {
    const respons = await fetch('http://192.168.1.237:8080/community-searcher');

    const data = await respons.json();

    setCommunity(data);
  };

  useEffect(() => {
    getCommunity();
  }, []);

  console.log(community);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Community Searches</Text>
      {community &&
        community.cs.map((item: any) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                borderRadius: 20,
                margin: 20,
              }}
              key={item.id}>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
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

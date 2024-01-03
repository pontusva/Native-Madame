import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function CommunitySearches() {
  const [community, setCommunity] = useState();

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
    </View>
  );
}

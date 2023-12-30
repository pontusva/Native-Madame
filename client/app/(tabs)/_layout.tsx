import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Pet alerts',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="hacker-news" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community_searches"
        options={{
          title: 'Community',
          tabBarIcon: ({ color }) => <TabBarIcon name="contao" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pet_buddy"
        options={{
          title: 'PetBuddy',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="snapchat-square" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="find_pet"
        options={{
          title: 'Find',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="forumbee" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

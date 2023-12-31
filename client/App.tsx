import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CommunitySearches from './app/CommunitySearches';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import FindPet from './app/FindPet';
import PetAlert from './app/PetAlert';
import PetBuddy from './app/PetBuddy';
import { auth } from './firebase.config';
import AuthNavigation from './app/authNavigation/AuthNavigation';
import SettingsDrawer from './app/components/drawers/SettingsDrawer';
import { useLinkTo } from '@react-navigation/native';
import UploadLostPetForm from './app/components/forms/UploadLostPetForm';
auth;
type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Details: undefined;
};

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  const linkTo = useLinkTo();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          headerRight: () => (
            <MaterialCommunityIcons
              style={{
                marginRight: 10,
              }}
              name="cog"
              onPress={() => linkTo('/Settings')}
              color="black"
              size={30}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Settings" component={SettingsDrawer} />
    </HomeStack.Navigator>
  );
}

const PetStack = createNativeStackNavigator();

function FindPetStackScreen() {
  const linkTo = useLinkTo();
  return (
    <PetStack.Navigator>
      <PetStack.Screen
        options={{
          headerRight: () => (
            <MaterialCommunityIcons
              style={{
                marginRight: 10,
              }}
              name="upload"
              onPress={() => linkTo('/PetForm')}
              color="black"
              size={30}
            />
          ),
        }}
        name="Your Pets"
        component={FindPet}
      />
      <PetStack.Screen name="PetForm" component={UploadLostPetForm} />
    </PetStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Welcome"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          component={HomeStackScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="comment-outline"
                color={color}
                size={size}
              />
            ),
          }}
          name="CommunitySearches"
          component={CommunitySearches}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="find-replace"
                color={color}
                size={size}
              />
            ),
          }}
          name="HiddenFindPet"
          component={FindPetStackScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="alert-octagon"
                color={color}
                size={size}
              />
            ),
          }}
          name="PetAlert"
          component={PetAlert}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            ),
          }}
          name="PetBuddy"
          component={PetBuddy}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuthenticated(!!user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return isAuthenticated ? <MainNavigation /> : <AuthNavigation />;
}

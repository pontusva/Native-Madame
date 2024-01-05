import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CommunitySearches from './app/CommunitySearchStackScreen/CommunitySearches';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import FindPet from './app/FindPetStackScreen/FindPet';
import PetAlert from './app/PetAlertStack/PetAlert';
import PetBuddy from './app/PetBuddy';
import { auth } from './firebase.config';
import AuthNavigation from './app/authNavigation/AuthNavigation';
import SettingsDrawer from './app/components/drawers/SettingsDrawer';
import { useLinkTo } from '@react-navigation/native';
import UploadLostPetForm from './app/components/forms/UploadLostPetForm';
import PetProfile from './app/FindPetStackScreen/PetProfile';
import PetMap from './app/PetMap';
import PetAlertProfile from './app/PetAlertStack/PetAlertProfile';
import CommunitySearchesProfile from './app/CommunitySearchStackScreen/CommunityProfile';
auth;

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
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
      <HomeStack.Screen name="PetMap" component={PetMap} />
      <HomeStack.Screen name="Settings" component={SettingsDrawer} />
    </HomeStack.Navigator>
  );
}

const MapPetStack = createNativeStackNavigator();

function MapPetStackScreen() {
  return (
    <MapPetStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MapPetStack.Screen name="Lost pet map" component={PetMap} />
    </MapPetStack.Navigator>
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
              onPress={() => linkTo('/Upload missing pet')}
              color="black"
              size={30}
            />
          ),
        }}
        name="Your Pets"
        component={FindPet}
      />
      <PetStack.Screen
        name="Upload missing pet"
        component={UploadLostPetForm}
      />
      <PetStack.Screen
        name="Last Seen Location"
        component={MapPetStackScreen}
      />
      <PetStack.Screen name="Pet Profile" component={PetProfile} />
    </PetStack.Navigator>
  );
}

const PetAlertStack = createNativeStackNavigator();

function PetAlertStackScreen() {
  return (
    <PetAlertStack.Navigator>
      <PetAlertStack.Screen name="Pet alert" component={PetAlert} />
      <PetAlertStack.Screen name="Alert Profile" component={PetAlertProfile} />
    </PetAlertStack.Navigator>
  );
}

const CommunitySearchesStack = createNativeStackNavigator();

function CommunitySearchesStackScreen() {
  return (
    <CommunitySearchesStack.Navigator>
      <CommunitySearchesStack.Screen
        name="CommunitySearches"
        component={CommunitySearches}
      />

      <CommunitySearchesStack.Screen
        options={{
          headerTitle: '',
        }}
        name="Community Profile"
        component={CommunitySearchesProfile}
      />
    </CommunitySearchesStack.Navigator>
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
          name="Community"
          component={CommunitySearchesStackScreen}
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
          component={PetAlertStackScreen}
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

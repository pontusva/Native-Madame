import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './Login';
import Register from './Register';

const authNavigationStack = createBottomTabNavigator();

export default function AuthNavigation() {
  return (
    <NavigationContainer>
      <authNavigationStack.Navigator>
        <authNavigationStack.Screen
          name="Login"
          component={Login}
          options={{
            header: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="login" color={color} size={size} />
            ),
          }}
        />
        <authNavigationStack.Screen
          name="Signup"
          component={Register}
          options={{
            header: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="sign-direction-plus"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </authNavigationStack.Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import LoginScreen from './screens/loginScreen/LoginScreen';
import HomeScreen from './screens/homeScreen/HomeScreen';
import RegisterScreen from './screens/loginScreen/RegisterScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown:false }} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{ headerShown:false }} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen options={{ headerShown:false }} name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

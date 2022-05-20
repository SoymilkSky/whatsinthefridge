import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

import LoginScreen from './screens/loginScreen/LoginScreen';
import HomeScreen from './screens/homeScreen/HomeScreen';
import RegisterScreen from './screens/loginScreen/RegisterScreen';
import SuccessfulRegister from './screens/loginScreen/SuccessfulRegister';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown:false }} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{ headerShown:false }} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen options={{ headerShown:false }} name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen options={{ headerShown:false }} name="SuccessfulRegister" component={SuccessfulRegister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

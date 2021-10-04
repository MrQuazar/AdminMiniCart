import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import AdminLogin from './Components/Auth//AdminLogin';
import AdminRegister from './Components/Auth//AdminRegister';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Admin Login'>
        <Stack.Screen name='Admin Login' component={AdminLogin} options={{ headerShown: false }} />
        <Stack.Screen name='Admin Register' component={AdminRegister} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

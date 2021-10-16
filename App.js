import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import adminOrderScreen from './Components/adminOrderScreen';
import AdminLogin from './Components/Auth//AdminLogin';
import AdminCartScreen from './Components/admincart';
import FeedBack from './Components/FeedBack';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Admin Login'>
        <Stack.Screen name='Admin Login' component={AdminLogin} options={{ headerShown: false }} />
        <Stack.Screen name='adminOrderScreen' component={adminOrderScreen} options={{ headerShown: false }} />
        <Stack.Screen name='admincart' component={AdminCartScreen} options={{ headerShown: false }} />
        <Stack.Screen name='FeedBack' component={FeedBack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

import React from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import App from './App';
import Settings from './Settings';

const Tab = createMaterialBottomTabNavigator();
function Main() {
    return (
        <NavigationContainer>
            <Tab.Navigator backBehavior="history">
                <Tab.Screen name="Home" component={App} options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={20} />
                    ),
                }} />
                <Tab.Screen name="Settings" component={Settings} options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="settings" color={color} size={20} />
                    ),
                }} />
                <Tab.Screen name="About" component={Settings} options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="developer-board" color={color} size={20} />
                    ),
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Main;

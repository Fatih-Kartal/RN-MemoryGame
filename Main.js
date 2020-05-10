import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import App from './App';
import Settings from './Settings';
import About from './About';
import GENERAL_SETTINGS from './Settings';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

const Tab = createMaterialBottomTabNavigator();
function Main() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
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
                    <Tab.Screen name="About" component={About} options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="developer-board" color={color} size={20} />
                        ),
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    );
}

export default Main;

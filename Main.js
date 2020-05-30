import React, { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import App from './App';
import Settings from './Settings';
import About from './About';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Spinner } from '@ui-kitten/components';

const Tab = createMaterialBottomTabNavigator();
function Main() {
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);
    if (isLoading) {
        return (
            <ApplicationProvider {...eva} theme={eva.light}>
                <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} level='4'>
                    <Spinner size='giant' />
                    <Text style={{ marginTop: 40, fontWeight: "bold" }}>This is a fake loading screen..</Text>
                </Layout>
            </ApplicationProvider>
        );
    }
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

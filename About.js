//#region IMPORTS
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { Divider, List, ListItem, Button } from '@ui-kitten/components';
import { GLOBAL_FUNCTIONS } from './App';
//#endregion
function AboutHeader() {
    return (
        <View style={styles.aboutHeader}>
            <Text style={styles.aboutHeaderText}>High Scores
            <Text style={{ fontSize: 10 }}>  Scroll down for more.</Text>
            </Text>
        </View>
    );
}
function HighScores() {
    const [highScores, setHighScores] = useState([]);
    GLOBAL_FUNCTIONS.SetHighScores = setHighScores;
    useEffect(() => {
        GLOBAL_FUNCTIONS.GetHighScores();
    }, []);
    const renderItem = ({ item, index }) => (
        <ListItem
            title={() => {
                return (
                    <View style={{ marginLeft: 8, flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                        <View style={[styles.scoreTitleCategory, { flex: 2 }]}>
                            <FontAwesome name="user" />
                            <Text>  {item.user}</Text>
                        </View>
                        <View style={[styles.scoreTitleCategory, { flex: 1 }]}>
                            <FontAwesome name="flag-checkered" />
                            <Text style={{ fontSize: 12 }}> SCORE: {item.score} </Text>
                        </View>
                        <View style={[styles.scoreTitleCategory, { flex: 1 }]}>
                            <FontAwesome name="exchange" />
                            <Text style={{ fontSize: 12 }}> FLIP: {item.flip}</Text>
                        </View>
                        <View style={[styles.scoreTitleCategory, { flex: 1 }]}>
                            <FontAwesome name="clock-o" />
                            <Text style={{ fontSize: 12 }}> TIME: {item.time}</Text>
                        </View>
                    </View>
                );
            }}
            description={item.date}
        />
    );
    if (highScores === null || highScores.length === 0) {
        return (
            <View style={{ height: 100, flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                <Text style={{ fontSize: 20 }}>THERE IS NO HIGHSCORE RIGHT NOW</Text>
            </View>
        );
    }
    else {
        return (
            <List
                style={styles.scoresContainer}
                data={highScores}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        );
    }
};
function About() {
    return (
        <View>
            <AboutHeader />
            <HighScores />
            <Button onPress={async function () {
                try {
                    await AsyncStorage.setItem("highScores", JSON.stringify([]));
                }
                catch (e) {
                    Alert.alert('Error', e.message, [{ text: "OK", onPress: () => { } }], { cancelable: true });
                }
                GLOBAL_FUNCTIONS.SetHighScores([]);
            }}>
                CLEAR RECORDS
          </Button>
        </View >
    );
}

const styles = StyleSheet.create({
    aboutHeader:
    {
        height: 40,
        backgroundColor: "#007aff",
        justifyContent: "center"
    },
    aboutHeaderText:
    {
        fontSize: 24,
        textAlign: "center",
        color: "white"
    },
    scoresContainer: {
        maxHeight: 300,
    },
    scoreTitleCategory: {
        flexDirection: "row",
        alignItems: "center"
    }
});
export default About
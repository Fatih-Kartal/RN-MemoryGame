//#region IMPORTS
import React, { useEffect, useState } from 'react';
import { View, Text, Vibration, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { Divider, List, ListItem } from '@ui-kitten/components';
//#endregion
async function sHighScores() {
    try {
        await AsyncStorage.setItem('highScores', JSON.stringify([{ score: 14, date: new Date().toLocaleString() }]));
    }
    catch (e) {
        alert("An error occured while fetching data");
    }
}
function AboutHeader() {
    return (
        <View style={styles.aboutHeader}>
            <Text style={styles.aboutHeaderText}>High Scores</Text>
        </View>
    );
}
function HighScores() {
    const [highScores, setHighScores] = useState([]);
    async function getHighScores() {
        try {
            const value = await AsyncStorage.getItem('highScores');
            var highScores = JSON.parse(value);
            if (highScores === null || highScores.length === 0) {
                setHighScores([{
                    score: "There is no high score right now",
                    date: new Date().toLocaleString()
                }]);
            }
            else {
                setHighScores(highScores);
            }
        }
        catch (e) {
            alert("An error occured while fetching data");
        }
    }
    useEffect(() => {
        getHighScores();
    }, []);
    const renderItem = ({ item, index }) => (
        <ListItem
            title={() => {
                return (
                    <View style={{ marginLeft: 8, flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                        <View style={[styles.scoreTitleCategory, { flex: 2 }]}>
                            <FontAwesome name="user" />
                            <Text>  Fatih Kartal</Text>
                        </View>
                        <View style={[styles.scoreTitleCategory, { flex: 1 }]}>
                            <FontAwesome name="flag-checkered" />
                            <Text style={{fontSize:12}}> SCORE: {item.score} </Text>
                        </View>
                        <View style={[styles.scoreTitleCategory, { flex: 1 }]}>
                            <FontAwesome name="exchange" />
                            <Text style={{fontSize:12}}> FLIP: {item.score}</Text>
                        </View>
                        <View style={[styles.scoreTitleCategory, { flex: 1 }]}>
                            <FontAwesome name="clock-o" />
                            <Text style={{fontSize:12}}> TIME: {item.score}</Text>
                        </View>
                    </View>
                );
            }}
            description={item.date}
        />
    );
    return (
        <List
            style={styles.scoresContainer}
            data={highScores}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );
};
function About() {
    return (
        <View>
            <AboutHeader />
            <HighScores />
        </View>
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
        maxHeight: 260,
    },
    scoreTitleCategory: {
        flexDirection: "row",
        alignItems: "center"
    }
});
export default About
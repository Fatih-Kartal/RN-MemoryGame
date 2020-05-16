import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet, View, Text, FlatList, StatusBar, Dimensions, TouchableOpacity,
  Image, Vibration, Alert
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CountDown from 'react-native-countdown-component';
import shuffle from './Util';
import { GENERAL_SETTINGS } from './Settings';
import { Button, Card, Modal, Input } from '@ui-kitten/components';

let GLOBAL_VARIABLES = {
  TimeLeft: 0,
  Score: 0,
  FlipCount: 0,
}
export let GLOBAL_FUNCTIONS = {
  SetScore: () => { },
  SetFlipCount: () => { },
  SetHighScores: () => { },
  GetHighScores: async function () {
    try {
      const value = await AsyncStorage.getItem('highScores');
      var highScores = JSON.parse(value);
      GLOBAL_FUNCTIONS.SetHighScores([...highScores]);
    }
    catch (e) {
      Alert.alert('Error', 'An error occured while fetching data', [{ text: "OK", onPress: () => { } }], { cancelable: true });
    }
  },
  AddNewHighScore: async function (userName) {
    const value = await AsyncStorage.getItem('highScores');
    var highScores = JSON.parse(value);
    highScores.push({ user: userName, score: GLOBAL_VARIABLES.Score, flip: GLOBAL_VARIABLES.FlipCount, time: GLOBAL_VARIABLES.TimeLeft, date: new Date().toLocaleString() });
    await AsyncStorage.setItem('highScores', JSON.stringify(highScores));
    GLOBAL_FUNCTIONS.GetHighScores();
  },
  SetVisibleOfGameOverModal: () => { }
}
const numColumns = 4;
const tileWidth = Dimensions.get("window").width / numColumns;
let openCounter = 0;
let tiles = [
  {
    text: "1",
    imagesrc: require("./assets/images/banana.png"),
    value: 1,
    tileId: "1x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "1",
    imagesrc: require("./assets/images/banana.png"),
    value: 1,
    tileId: "1x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "2",
    imagesrc: require("./assets/images/cherry.png"),
    value: 2,
    tileId: "2x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "2",
    imagesrc: require("./assets/images/cherry.png"),
    value: 2,
    tileId: "2x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "3",
    imagesrc: require("./assets/images/citrus.png"),
    value: 3,
    tileId: "3x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "3",
    imagesrc: require("./assets/images/citrus.png"),
    value: 3,
    tileId: "3x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "4",
    imagesrc: require("./assets/images/coconut.png"),
    value: 4,
    tileId: "4x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "4",
    imagesrc: require("./assets/images/coconut.png"),
    value: 4,
    tileId: "4x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "5",
    imagesrc: require("./assets/images/corn.png"),
    value: 5,
    tileId: "5x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "5",
    imagesrc: require("./assets/images/corn.png"),
    value: 5,
    tileId: "5x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "6",
    imagesrc: require("./assets/images/dragon-fruit.png"),
    value: 6,
    tileId: "6x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "6",
    imagesrc: require("./assets/images/dragon-fruit.png"),
    value: 6,
    tileId: "6x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "7",
    imagesrc: require("./assets/images/kiwi.png"),
    value: 7,
    tileId: "7x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "7",
    imagesrc: require("./assets/images/kiwi.png"),
    value: 7,
    tileId: "7x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "8",
    imagesrc: require("./assets/images/lime.png"),
    value: 8,
    tileId: "8x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "8",
    imagesrc: require("./assets/images/lime.png"),
    value: 8,
    tileId: "8x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "9",
    imagesrc: require("./assets/images/orange.png"),
    value: 9,
    tileId: "9x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "9",
    imagesrc: require("./assets/images/orange.png"),
    value: 9,
    tileId: "9x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "10",
    imagesrc: require("./assets/images/pear.png"),
    value: 10,
    tileId: "10x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "10",
    imagesrc: require("./assets/images/pear.png"),
    value: 10,
    tileId: "10x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "11",
    imagesrc: require("./assets/images/pineapple.png"),
    value: 11,
    tileId: "11x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "11",
    imagesrc: require("./assets/images/pineapple.png"),
    value: 11,
    tileId: "11x2",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "12",
    imagesrc: require("./assets/images/pomegranate.png"),
    value: 12,
    tileId: "12x1",
    open: false,
    alwaysOpen: false,
  },
  {
    text: "12",
    imagesrc: require("./assets/images/pomegranate.png"),
    value: 12,
    tileId: "12x2",
    open: false,
    alwaysOpen: false,
  }
];
shuffle(tiles);
function GameHeader() {
  const [flipCount, setFlipCount] = useState(0);
  const [score, setScore] = useState(0);
  GLOBAL_FUNCTIONS.SetFlipCount = setFlipCount;
  GLOBAL_FUNCTIONS.SetScore = setScore;
  GLOBAL_VARIABLES.FlipCount = flipCount;
  GLOBAL_VARIABLES.Score = score;
  return (
    <View style={styles.gameHeader}>
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="clock-o" style={styles.gameHeaderText} />
        <CountDown
          style={styles.gameHeaderText}
          size={12}
          until={100}
          onFinish={() => {
            if (GENERAL_SETTINGS.vibration) Vibration.vibrate(500);
            //Alert.alert('Time Over', 'You run out of time', [{ text: "OK", onPress: () => { } }], { cancelable: true });
            GLOBAL_FUNCTIONS.SetVisibleOfGameOverModal(true);
          }}
          onChange={(e) => {
            GLOBAL_VARIABLES.TimeLeft = e;
          }}
          digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#00abff' }}
          digitTxtStyle={{ color: '#00abff' }}
          separatorStyle={{ color: '#fff' }}
          timeToShow={['M', 'S']}
          timeLabels={{ m: null, s: null }}
          showSeparator
          running
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="flag-checkered" style={styles.gameHeaderText} />
        <Text style={styles.gameHeaderText}> {score}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="exchange" style={styles.gameHeaderText} />
        <Text style={styles.gameHeaderText}> {flipCount}</Text>
      </View>
    </View>
  );
}
function BoxContainerComponent() {
  const [boxArray, changeArray] = useState(tiles);
  return (
    <FlatList
      style={{ width: "100%" }}
      data={boxArray}
      renderItem={item => <BoxComponent item={item} changeArray={changeArray} />}
      keyExtractor={item => item.tileId}
      numColumns={numColumns}
    />
  );
}
function BoxComponent({ item, changeArray }) {
  return (
    <TouchableOpacity style={styles.tileTouchable}
      onPress={() => {
        if (!item.item.open) { //Tıkladığım karo zaten açıksa hiçbirşey yapma
          GLOBAL_FUNCTIONS.SetFlipCount(GLOBAL_VARIABLES.FlipCount + 1);
          if (openCounter == 2) { //Eğer tıklandığında, açık karo sayısı 2 tane ise alwaysOpen olmayan karoları kapatır
            openCounter = 0;
            for (let i = 0; i < tiles.length; i++) {
              if (!tiles[i].alwaysOpen) {
                tiles[i].open = false;
              }
            }
          }
          openCounter++;
          var filtered = tiles.filter(f => f.value === item.item.value && f.open /*&& f.tileId !== item.item.tileId*/);
          if (filtered.length === 1) {
            filtered[0].alwaysOpen = true;
            tiles[item.index].alwaysOpen = true;
            GLOBAL_FUNCTIONS.SetScore(GLOBAL_VARIABLES.Score + 10);
            if (GENERAL_SETTINGS.vibration) {
              Vibration.vibrate(50);
            } openCounter = 0;
          }
          tiles[item.index].open = true;
          changeArray([...tiles]);
        }
      }}>
      <View style={[styles.tileView]}>
        <Image source={item.item.imagesrc} style={[styles.tileImage, { display: (item.item.open || item.item.alwaysOpen) ? "flex" : "none" }]}></Image>
      </View>
    </TouchableOpacity >
  );
}
function GameOverComponent() {
  const [visible, setVisible] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  GLOBAL_FUNCTIONS.SetVisibleOfGameOverModal = setVisible;
  return (
    <View>
       {/* <Button onPress={() => setVisible(true)}>
        TOGGLE MODAL
      </Button>  */}
      <Modal visible={visible} backdropStyle={styles.gameOverModalBackdrop}>
        <Card style={{ width: 3 * (Dimensions.get("window").width / 4) }}>
          <Text style={{ marginBottom: 5 }}>Game Over! Your Score: {GLOBAL_VARIABLES.Score}</Text>
          <Input style={styles.input} status='primary' placeholder='What is your name?' onChangeText={(value) => { setUserName(value) }} />
          <Button onPress={() => {
            if (userName.trim() === "") {
              Alert.alert('Error', 'Please enter your name', [{ text: "OK", onPress: () => { } }], { cancelable: true });
            }
            else {
              setVisible(false);
              GLOBAL_FUNCTIONS.AddNewHighScore(userName);
            }
          }}>
            SUBMIT
          </Button>
        </Card>
      </Modal>
    </View >
  );
};
function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <GameHeader />
      <BoxContainerComponent />
      <GameOverComponent />
    </>
  );
}
const styles = StyleSheet.create({
  tileTouchable: {
    width: tileWidth,
    height: tileWidth,
    padding: 5
  },
  tileView: {
    borderWidth: 2,
    borderColor: "black",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
  },
  tileImage: {
    alignSelf: "center",
    width: "75%",
    height: "75%",
  },
  gameHeader:
  {
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#007aff",
  },
  gameHeaderText:
  {
    alignSelf: "center",
    fontSize: 32,
    color: "white"
  },
  gameOverModalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});

export default App;

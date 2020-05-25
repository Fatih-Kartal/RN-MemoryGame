import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet, View, Text, FlatList, StatusBar, Dimensions, TouchableOpacity,
  Image, Vibration, Alert, ImageBackground
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CountDown from 'react-native-countdown-component';
import shuffle from './Util';
import { Button, Card, Modal, Input } from '@ui-kitten/components';

export let GLOBAL_VARIABLES = {
  TimeLeft: 0,
  Score: 0,
  FlipCount: 0,
  IsGameRunning: false,
  IsTimeOver: false,
  IsGameOver: false,
  IsGameWon: false,
  GeneralSettings: {}
}
export let GLOBAL_FUNCTIONS = {
  SetScore: () => { },
  SetFlipCount: () => { },
  SetHighScores: () => { },
  GetHighScores: async function () {
    try {
      const value = await AsyncStorage.getItem('highScores');
      var highScores = JSON.parse(value);
      GLOBAL_FUNCTIONS.SetHighScores([...highScores.reverse()]);
    }
    catch (e) {
      Alert.alert('Error', 'An error occured while fetching data', [{ text: "OK", onPress: () => { } }], { cancelable: true });
    }
  },
  AddNewHighScore: async function (userName) {
    const value = await AsyncStorage.getItem('highScores');
    var highScores = JSON.parse(value);
    var newScore = { user: userName, score: GLOBAL_VARIABLES.Score, flip: GLOBAL_VARIABLES.FlipCount, time: GLOBAL_VARIABLES.TimeLeft, date: new Date().toLocaleString() }
    console.log(newScore, GLOBAL_VARIABLES);
    highScores.push(newScore);
    await AsyncStorage.setItem('highScores', JSON.stringify(highScores));
    GLOBAL_FUNCTIONS.GetHighScores();
  },
  SetVisibleOfGameOverModal: () => { },
  ResetGame: () => { },
  SetTimerRunning: () => { },
  ResetTime: () => {
    GLOBAL_VARIABLES.IsTimeOver = false;
    GLOBAL_VARIABLES.TimeLeft = 0;
    GLOBAL_FUNCTIONS.SetTime(60/*GLOBAL_VARIABLES.GeneralSettings.time*/);
    GLOBAL_FUNCTIONS.SetTimerRunning(false);

  },
  GetGeneralSettings: async () => {
    try {
      var darkMode = await AsyncStorage.getItem('darkMode');
      var vibration = await AsyncStorage.getItem('vibration');
      var difficulty = await AsyncStorage.getItem('difficulty');
      var NewSettings = {
        ...GLOBAL_VARIABLES.GeneralSettings, ...{
          darkMode: JSON.parse(darkMode),
          vibration: JSON.parse(vibration),
          difficulty: JSON.parse(difficulty),
        }
      }
      GLOBAL_VARIABLES.GeneralSettings = NewSettings;
      console.log(NewSettings);
    }
    catch (e) {
      console.log(e);
      Alert.alert('Error', 'An error occured while fetching data', [{ text: "OK", onPress: () => { } }], { cancelable: true });
    }
  },
  SetGeneralSetting: async (settingName, settingValue) => {
    GLOBAL_VARIABLES.GeneralSettings[settingName] = settingValue;
    await AsyncStorage.setItem(settingName, JSON.stringify(settingValue));
  }
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
  const [time, setTime] = useState(60/*GLOBAL_VARIABLES.GeneralSettings.time*/);
  const [isTimerRunning, setTimerRunning] = useState(false);
  GLOBAL_FUNCTIONS.SetFlipCount = setFlipCount;
  GLOBAL_FUNCTIONS.SetScore = setScore;
  GLOBAL_FUNCTIONS.SetTime = setTime;
  GLOBAL_FUNCTIONS.SetTimerRunning = setTimerRunning;
  GLOBAL_VARIABLES.FlipCount = flipCount;
  GLOBAL_VARIABLES.Score = score;
  return (
    <View style={styles.gameHeader}>
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="clock-o" style={styles.gameHeaderText} />
        <CountDown
          style={styles.gameHeaderText}
          size={12}
          until={time}
          onFinish={() => {
            if (!GLOBAL_VARIABLES.IsGameWon) {
              if (GLOBAL_VARIABLES.GeneralSettings.vibration) Vibration.vibrate(500);
              GLOBAL_VARIABLES.IsTimeOver = true;
              GLOBAL_VARIABLES.IsGameOver = true;
              GLOBAL_FUNCTIONS.SetVisibleOfGameOverModal(true);
            } //Oyun kazanıldıysa süre bitiminden etkilenme
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
          running={isTimerRunning}
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
        if (item.item.open) return; //Tıkladığım karo zaten açıksa hiçbirşey yapma
        if (GLOBAL_VARIABLES.IsGameOver) return; //Oyun bitti ise hiçbirşey yapma
        if (!GLOBAL_VARIABLES.IsGameRunning) {
          GLOBAL_VARIABLES.IsGameRunning = true;
          GLOBAL_FUNCTIONS.SetTimerRunning(true);
        }
        GLOBAL_FUNCTIONS.SetFlipCount(GLOBAL_VARIABLES.FlipCount + 1);
        if (openCounter == 2) { //Eğer tıklandığında, açık karo sayısı 2 tane ise alwaysOpen olmayan karoları kapatır
          for (let i = 0; i < tiles.length; i++) {
            if (!tiles[i].alwaysOpen) tiles[i].open = false;
          }
          openCounter = 0;
        }
        openCounter++;
        var filtered = tiles.filter(f => f.value === item.item.value && f.open /*&& f.tileId !== item.item.tileId*/);
        if (filtered.length === 1) {
          filtered[0].alwaysOpen = true;
          tiles[item.index].alwaysOpen = true;
          GLOBAL_FUNCTIONS.SetScore(GLOBAL_VARIABLES.Score + 10);
          openCounter = 0;
          if (GLOBAL_VARIABLES.GeneralSettings.vibration) Vibration.vibrate(100); //Titreşim açıksa titret
          if (tiles.filter(f => f.alwaysOpen === true).length === tiles.length) {
            if (GLOBAL_VARIABLES.GeneralSettings.vibration) Vibration.vibrate(500);
            GLOBAL_VARIABLES.IsGameOver = true;
            GLOBAL_VARIABLES.IsGameWon = true;
            GLOBAL_FUNCTIONS.SetTimerRunning(false);
            GLOBAL_FUNCTIONS.SetVisibleOfGameOverModal(true);
          } //Bütün karolar açık ise oyun bitti ekranını göster
        }
        tiles[item.index].open = true;
        changeArray([...tiles]);
      }}>
      <View style={[styles.tileView, { display: item.item.alwaysOpen ? "none" : "flex", borderWidth: item.item.alwaysOpen ? 0 : 2 }]}>
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
          <Button onPress={async () => {
            if (userName.trim() === "") {
              Alert.alert('Error', 'Please enter your name', [{ text: "OK", onPress: () => { } }], { cancelable: true });
            }
            else {
              setVisible(false);
              await GLOBAL_FUNCTIONS.AddNewHighScore(userName);
              GLOBAL_VARIABLES.ResetGame();
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
  const [resetGame, setResetGame] = useState(new Date());
  GLOBAL_VARIABLES.ResetGame = () => {
    tiles.forEach((value) => {
      value.open = false;
      value.alwaysOpen = false;
    });
    shuffle(tiles);
    GLOBAL_VARIABLES.IsGameRunning = false;
    GLOBAL_VARIABLES.IsGameOver = false;
    GLOBAL_VARIABLES.IsGameWon = false;
    GLOBAL_FUNCTIONS.ResetTime();
    GLOBAL_FUNCTIONS.SetFlipCount(0);
    GLOBAL_FUNCTIONS.SetScore(0);
    setResetGame(new Date());
  }
  GLOBAL_FUNCTIONS.GetGeneralSettings();
  return (
    <>
      <ImageBackground style={{ flex: 1 }} source={require("./assets/images/background01.jpg")}>
        <View key={resetGame}>
          <StatusBar barStyle="default" />
          <GameHeader />
          <BoxContainerComponent />
          <GameOverComponent />
        </View>
      </ImageBackground>
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
    //borderWidth: 2,
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

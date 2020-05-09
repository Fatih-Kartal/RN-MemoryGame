import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  Vibration
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CountDown from 'react-native-countdown-component';
import shuffle from './Util';
import { GENERAL_SETTINGS } from './Settings';


let g_setFlipCount;
let g_flipCount;
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
  g_setFlipCount = setFlipCount;
  g_flipCount = flipCount;
  return (
    <View style={styles.gameHeader}>
      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons name="clock-outline" style={styles.gameHeaderText} />
        {/*<Text style={styles.gameHeaderText}> 60</Text>*/}
        <CountDown
          style={styles.gameHeaderText}
          size={12}
          until={1000}
          onFinish={() => {
            if (GENERAL_SETTINGS.vibration) {
              Vibration.vibrate(500);
            }
            alert('Finished');
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
        <MaterialCommunityIcons name="rotate-3d" style={styles.gameHeaderText}></MaterialCommunityIcons>
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
          g_setFlipCount(g_flipCount + 1);
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
function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <GameHeader />
      <BoxContainerComponent />
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
  }
});

export default App;

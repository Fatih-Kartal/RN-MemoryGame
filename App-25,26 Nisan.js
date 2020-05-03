import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";

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
];
tiles.sort(() => Math.random() - 0.5);

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
            openCounter = 0;
          }
          tiles[item.index].open = true;
          changeArray([...tiles]);
        }
      }}>
      <View style={styles.tileView}>
        <Text style={[styles.tileText, { display: (item.item.open || item.item.alwaysOpen) ? "flex" : "none", color: item.item.alwaysOpen ? "red" : "black" }]}>
          {item.item.text}
        </Text>
      </View>
    </TouchableOpacity >
  );
}
function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <View style={{ flex: 1 }}>
        <BoxContainerComponent />
      </View>
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
    justifyContent: "center"
  },
  tileText: {
    textAlign: "center",
    fontSize: 40,
  },
});

export default App;

import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import backToCart from "./../assets/backToCart.png";
import info from "./../assets/info.png";
import backy from './../assets/background.png'

import fire from "./firebase";
import "firebase/database";

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function Cart({ navigation }) {
  const [textInputValue, setTextInputValue] = React.useState('');
  const [value, onChangeText] = React.useState('Useless Placeholder');
  var BO=0;
  var RO=0;
  var GO=0;
  const [state, setState] = useState({
    productNo: 0,
    blueOrder:0,
    greenOrder:0, 
    redOrder:0,
    search: ''
  });
  const [orders, setOrders] = useState([]);
  React.useEffect(() => {
    fire
      .database()
      .ref("Orders")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        console.log(data);
        if (data) {
          const items = Object.values(data);
          console.log(items);
          for(let i=0; i<items.length; i++) {
          console.log(items[i].Status)
          if (items[i].Status === "B") (BO=BO+1);
          if (items[i].Status === "R") (RO=RO+1);
          if (items[i].Status === "G") (GO=GO+1);
          setState({blueOrder:BO,redOrder:RO,greenOrder:GO})
          }
          setOrders(items.slice(0));
          console.log(orders);
        }
      });
  }, []);

  console.log(orders);


  return (
    <View
      style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center" }}
    >
         <ImageBackground source={backy} style={styles.image}>
      <TextInput 
      style={styles.InputStyle1}  
      placeholder='Search here'
      onChangeText={(text) => setTextInputValue(text)}
      value={textInputValue}>
      </TextInput>
      <TouchableOpacity style={styles.infoStyle}>
        <ImageBackground
          source={info}
          style={{ resizeMode: "contain", width: "100%", height: "100%" }}
        />
      </TouchableOpacity>

      <Text style={styles.blueStyle}>{state.blueOrder}</Text>
      <Text style={styles.redStyle}>{state.redOrder}</Text>
      <Text style={styles.greenStyle}>{state.greenOrder}</Text>

      <TouchableOpacity
        style={styles.backToCartStyle}
        onPress={() => {
          
        }}
      >
        <Image
          source={backToCart}
          style={{ resizeMode: "contain", width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ justifyContent: "space-around" }}
        style={{
          flexGrow: 0.75,
          left: (15 / 414) * windowWidth,
          top: (210/ 896) * windowHeight,
          width: (414 / 414) * windowWidth,
          height: (600 / 896) * windowHeight,
        }}
      >
        {orders.map((item, index) => {
          if(item.OrderNo.toString().toLowerCase().includes(textInputValue.toString().toLowerCase()) || textInputValue == ""){
          if (item.Status === "R")
            return (
              <View
                key={index}
                style={{
                  flex: 0.9,
                  width: (414 / 414) * windowWidth,
                  Height: (1000 / 896) * windowHeight,
                  top: (0 / 896) * windowHeight,
                  marginVertical: 50,
                }}
              >
                <TouchableOpacity
                  style={styles.redOrder}
                  title="BlueOrder"
                  onPress={() => navigation.navigate("admincart",item.OrderNo)}
                >
                  <Text style={{ color: "white" }}>
                    Order no. {item.OrderNo}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          if (item.Status === "B")
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  width: (414 / 414) * windowWidth,
                  Height: (1000 / 896) * windowHeight,
                  top: (0 / 896) * windowHeight,
                  marginVertical: 50,
                }}
              >
                <TouchableOpacity
                  style={styles.blueOrder}
                  title="BlueOrder"
                  onPress={() => navigation.navigate("admincart",item.OrderNo)}
                >
                  <Text style={{ color: "white" }}>
                    Order no. {item.OrderNo}
                  </Text>
                </TouchableOpacity>
              </View>
            );

          if (item.Status === "G")
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  width: (414 / 414) * windowWidth,
                  Height: (1000 / 896) * windowHeight,
                  top: (0 / 896) * windowHeight,
                  marginVertical: 50,
                }}
              >
                <TouchableOpacity
                  style={styles.greenOrder}
                  title="BlueOrder"
                  onPress={() => navigation.navigate("admincart",item.OrderNo)}
                >
                  <Text style={{ color: "white" }}>
                    Order no. {item.OrderNo}
                  </Text>
                </TouchableOpacity>
              </View>
            );
        }})}
      </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    position: "relative",
    resizeMode:'contain',
    "width": windowWidth,
    "height": windowHeight
  },
  background: {
    position: "relative",
    width: 414,
    height: 896,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    width: windowWidth,
    height: windowHeight,
  },

  backToCartStyle: {
    position: "absolute",
    width: (46 / 414) * windowWidth,
    height: (46 / 896) * windowHeight,
    right: (23 / 414) * windowWidth,
    top: (39 / 896) * windowHeight,
  },

  infoStyle: {
    position: "absolute",
    width: (380 / 414) * windowWidth,
    height: (120 / 896) * windowHeight,
    left: (10 / 414) * windowWidth,
    top: (92 / 896) * windowHeight,
  },

  blueStyle: {
    position: "absolute",
    right: (50 / 414) * windowWidth,
    top: (98 / 896) * windowHeight,
    fontWeight: "bold",
  },

  redStyle: {
    position: "absolute",
    right: (50 / 414) * windowWidth,
    top: (135 / 896) * windowHeight,
    fontWeight: "bold",
  },

  greenStyle: {
    position: "absolute",
    right: (50 / 414) * windowWidth,
    top: (174 / 896) * windowHeight,
    fontWeight: "bold",
  },

  blueOrder: {
    position: "absolute",
    width: 0.8913 * windowWidth,
    height: 0.0669 * windowHeight,
    backgroundColor: "#0137F4",
    color: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  redOrder: {
    position: "absolute",
    width: 0.8913 * windowWidth,
    height: 0.0669 * windowHeight,

    backgroundColor: "#F42D01",
    color: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  greenOrder: {
    position: "absolute",
    width: 0.8913 * windowWidth,
    height: 0.0669 * windowHeight,
    backgroundColor: "#06F401",
    color: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  InputStyle1: {
    position: "absolute",
    width: 0.7101449275362319 * windowWidth,
    height: 0.0357142857142857 * windowHeight,
    left: (15 / 414) * windowWidth,
    top: (46 / 896) * windowHeight,
    paddingLeft: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

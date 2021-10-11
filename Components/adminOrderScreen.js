import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import backToCart from "./../assets/backToCart.png";
import info from "./../assets/info.png";

import fire from "./firebase";
import "firebase/database";
import "firebase/auth";

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Cart({ navigation }) {
  const [textInputValue, setTextInputValue] = React.useState('');
  const [value, onChangeText] = React.useState('Useless Placeholder');

  const [state, setState] = useState({
    productNo: 2,
    blueOrder: 1,
    redOrder: 1,
    greenOrder: 1,
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
          setOrders(items.slice(0));
          console.log(orders);
        }
      });
  }, []);

  console.log(orders);

  const signOutUser = async () => {
    try{
        await fire.auth().signOut()
        navigation.navigate('Login')
        
    }catch(e){
        console.log('logout')
        console.log(e)
    }
}

  return (
    <View
      style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center" }}
    >
      <TextInput 
      style={styles.InputStyle1}  
      placeholder='Search here'
      onChangeText={(text) => setTextInputValue(text)}
      value={textInputValue}>
      </TextInput>
      <TouchableOpacity style={styles.infoStyle}>
        <Image
          source={info}
          style={{ resizeMode: "contain", width: "100%", height: "100%" }}
        />
      </TouchableOpacity>

      <Text style={styles.blueStyle}>{state.blueOrder}</Text>
      <Text style={styles.redStyle}>{state.redOrder}</Text>
      <Text style={styles.greenStyle}>{state.greenOrder}</Text>

      <TouchableOpacity
        style={styles.backToCartStyle}
        onPress={async () => {
          try{
              await fire.auth().signOut()
              navigation.navigate('Admin Login')
              
          }catch(e){
              console.log('logout')
              console.log(e)
          }
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
          flexGrow: 0.9,
          width: (414 / 414) * windowWidth,
          height: (600 / 896) * windowHeight,
        }}
      >
        {orders.map((item, index) => {
          if(item.OrderNo.toString().toLowerCase().includes(textInputValue.toString().toLowerCase()) || textInputValue == ""){
          if (item.Status === "D")
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  width: (414 / 414) * windowWidth,
                  Height: (1000 / 896) * windowHeight,
                  top: (-90 / 896) * windowHeight,
                  marginVertical: 60,
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
          if (item.Status === "D")
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  width: (414 / 414) * windowWidth,
                  Height: (1000 / 896) * windowHeight,
                  top: (-90 / 896) * windowHeight,
                  marginVertical: 60,
                }}
              >
                <TouchableOpacity
                  style={styles.blueOrder}
                  title="BlueOrder"
                  onPress={() => navigation.navigate("admincart")}
                >
                  <Text style={{ color: "white" }}>
                    Order no. {item.OrderNo}
                  </Text>
                </TouchableOpacity>
              </View>
            );

          if (item.Status === "D")
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  width: (414 / 414) * windowWidth,
                  Height: (1000 / 896) * windowHeight,
                  top: (-90 / 896) * windowHeight,
                  marginVertical: 60,
                }}
              >
                <TouchableOpacity
                  style={styles.greenOrder}
                  title="BlueOrder"
                  onPress={() => navigation.navigate("admincart")}
                >
                  <Text style={{ color: "white" }}>
                    Order no. {item.OrderNo}
                  </Text>
                </TouchableOpacity>
              </View>
            );
        }})}
      </ScrollView>
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
    width: (369 / 414) * windowWidth,
    height: (88 / 896) * windowHeight,
    left: (22 / 414) * windowWidth,
    top: (92 / 896) * windowHeight,
  },

  blueStyle: {
    position: "absolute",
    width: (16 / 414) * windowWidth,
    height: (17 / 896) * windowHeight,
    right: (50 / 414) * windowWidth,
    top: (98 / 896) * windowHeight,
    fontWeight: "bold",
  },

  redStyle: {
    position: "absolute",
    width: (16 / 414) * windowWidth,
    height: (17 / 896) * windowHeight,
    right: (50 / 414) * windowWidth,
    top: (127 / 896) * windowHeight,
    fontWeight: "bold",
  },

  greenStyle: {
    position: "absolute",
    width: (16 / 414) * windowWidth,
    height: (17 / 896) * windowHeight,
    right: (50 / 414) * windowWidth,
    top: (154 / 896) * windowHeight,
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

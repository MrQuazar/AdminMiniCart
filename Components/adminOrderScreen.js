import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

import backToCart from './../assets/backToCart.png'
import info from './../assets/info.png'

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Cart({ navigation }) {
  const [state, setState] = useState({ productNo: 2, blueOrder: 1, redOrder: 1, greenOrder: 1,})
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' }}>
      <TextInput style={styles.InputStyle1} placeholder='Search here'></TextInput>
      <TouchableOpacity style={styles.infoStyle}>
        <Image source={info} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
      </TouchableOpacity>

      <Text style={styles.blueStyle}>{state.blueOrder}</Text>
      <Text style={styles.redStyle}>{state.redOrder}</Text>
      <Text style={styles.greenStyle}>{state.greenOrder}</Text>

      <TouchableOpacity style={styles.backToCartStyle}>
        <Image source={backToCart} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.blueOrder} title='BlueOrder' onPress={() => navigation.navigate("admincart")}>
        <Text style={{color: "white"}}>Order No. 001</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.redOrder} title='RedOrder' onPress={() => navigation.navigate("admincart")}>
        <Text style={{color: "white"}}>Order No. 002</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.greenOrder} title='GreenOrder' onPress={() => navigation.navigate("admincart")}>
        <Text style={{color: "white"}}>Order No. 003</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  background: {
    position: "relative",
    width: 414,
    height: 896,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    "width": windowWidth,
    "height": windowHeight
  },

  backToCartStyle:{
    "position": "absolute",
    "width": 46/414 * windowWidth,
    "height": 46/896 * windowHeight,
    "right": 23/414 * windowWidth,
    "top": 39/896 * windowHeight
  },

  infoStyle:{
    "position": "absolute",
    "width": 369/414 * windowWidth,
    "height": 88/896 * windowHeight,
    "left": 22/414 * windowWidth,
    "top": 92/896 * windowHeight
  },

  blueStyle:{
    "position": "absolute",
    "width": 16/414 * windowWidth,
    "height": 17/896 * windowHeight,
    "right": 50/414 * windowWidth,
    "top": 98/896 * windowHeight,
    fontWeight: "bold"
  },

  redStyle:{
    "position": "absolute",
    "width": 16/414 * windowWidth,
    "height": 17/896 * windowHeight,
    "right": 50/414 * windowWidth,
    "top": 127/896 * windowHeight,
    fontWeight: "bold"
  },

  greenStyle:{
    "position": "absolute",
    "width": 16/414 * windowWidth,
    "height": 17/896 * windowHeight,
    "right": 50/414 * windowWidth,
    "top": 154/896 * windowHeight,
    fontWeight: "bold"
  },

  blueOrder: {
    "position": "absolute",
    "width": 0.8913 * windowWidth,
    "height": 0.0669 * windowHeight,
    "left": 0.0531 * windowWidth,
    "top": 195/896 * windowHeight,
    backgroundColor: "#0137F4",
    "color": "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  redOrder: {
    "position": "absolute",
    "width": 0.8913 * windowWidth,
    "height": 0.0669 * windowHeight,
    "left": 0.0531 * windowWidth,
    "top": 277/896 * windowHeight,
    backgroundColor: "#F42D01",
    "color": "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  greenOrder: {
    "position": "absolute",
    "width": 0.8913 * windowWidth,
    "height": 0.0669 * windowHeight,
    "left": 0.0531 * windowWidth,
    "top": 359/896 * windowHeight,
    backgroundColor: "#06F401",
    "color": "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  InputStyle1:
  {
    position: "absolute",
    "width": 0.7101449275362319 * windowWidth,
    "height": 0.0357142857142857 * windowHeight,
    "left": 15/414 * windowWidth,
    "top": 46/896 * windowHeight,
    paddingLeft: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  }
});
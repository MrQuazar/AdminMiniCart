import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity,ScrollView, Alert } from 'react-native';

import toOrders from './../assets/toOrders.png'
import proceed from './../assets/proceedBtn.png'
import backy from './../assets/background.png'
import { Dimensions } from 'react-native';

import fire from './firebase';
import 'firebase/database'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const itemsList = [];

export default function Cart({ navigation ,route }) {

  const [orderNo, setorderNo] = React.useState(route.params ? route.params : null);
  console.log(orderNo);
  const [QRarray, setQRarray] = React.useState([]);
  const [itemsArray, setItemsArray] = React.useState([]);
  const [newItemsArray, setNewItemsArray] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [loopRunner, setLoopRunner] = React.useState(0);
  
  React.useEffect(() => {
      fire.database().ref('Orders').orderByChild("OrderNo").equalTo(orderNo).on('value', snapshot => {
        let database = snapshot.val();
        const items = Object.values(database);
        itemsArray.push(items[0]);
        QRarray.push(itemsArray[0].QRArray);
        const qrs = QRarray[0];
        for (let i = 0; i < qrs.length; i++) {
          console.log(qrs[i].Code);
          fire.database().ref('Items').orderByChild("ItemId").equalTo(qrs[i].Code).on('value', snapshot => {
            let data = snapshot.val();
            const items = Object.values(data);
            newItemsArray.push(items[0]);
            setLoopRunner(i);
            if(newItemsArray.length===qrs.length) setFlag(true);
          });
      }
      });
    }, []);
    console.log(newItemsArray);
    const [totalCost,setTotalCost] = useState(0)
    const totalItems = newItemsArray.length;
  let sum =0,i=0
    for(let item of newItemsArray){
      sum += item.Price * (QRarray[0])[i].Quant;
      i++
    }
    if(!flag){return(<Text>The page is loading</Text>)}
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF'}}>
        <ImageBackground source={backy} style={styles.image}>
      <View style={{flex:0.5}}>
      <TouchableOpacity style={styles.toOrdersStyle} onPress={() => navigation.navigate("adminOrderScreen")} >
        <Image source={toOrders} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.proceedBtnStyle} title='Proceed' onPress={() => 
        navigation.navigate("FeedBack")}>
      <Image source={proceed} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
      </TouchableOpacity>
      <Text style={styles.totalText}>Total:</Text>
      <Text style={styles.cartTotal}>₹ {sum}</Text>
      <TextInput style={styles.InputStyle1} placeholder='Search here'></TextInput>  
      </View>

      <ScrollView contentContainerStyle= {{justifyContent:'space-around'}} style={{flexGrow: 0.1, "width": 414/414 * windowWidth, "height": 600/896 * windowHeight, "left": -10/414 * windowWidth, "top":120/896 * windowHeight}}>
        
        {newItemsArray.map((item, index) => {
          return (
            <View key={index} style={{flex: 1, "width": 414/414 * windowWidth, Height: 1000/896 * windowHeight,"top": -90/896 * windowHeight, marginVertical:60}}>

              <TouchableOpacity style={styles.prod1Style} >
                <Image source={{uri: item.Image}} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
              </TouchableOpacity>
              <Text style={styles.itemName}>{item.Name}</Text>
              <Text style={styles.itemPrice}>₹{item.Price * (QRarray[0])[index].Quant}</Text>
              <Text style={styles.itemQuantity}>{(QRarray[0])[index].Quant}</Text>
            </View>
          );
        })}
      </ScrollView>
      </ImageBackground>
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
    "width": windowWidth,
    "height": windowHeight
  },
  
  itemsList: {
    flex: 1,
    position: "relative",
    flexDirection: 'row',
    "width": 414/414 * windowWidth,
    "height": 0/896 * windowHeight,
    "left": 0/414 * windowWidth,
    "top": -100/896 * windowHeight,
  },
  
  dividerStyle: {
    "position": "absolute",
    "width": 800/414 * windowWidth,
    "height": 1/896 * windowHeight,
    "left": -200/414 * windowWidth,
    "top": 1/896 * windowHeight,
  },

  toOrdersStyle: {
    "position": "absolute",
    "width": 1.5*0.09 * windowWidth,
    "height": 1.5*0.05 * windowHeight,
    "right": 26/414 * windowWidth,
    "top": 50/896 * windowHeight
  },

  prod1Style: {
    "position": "absolute",
    "width": 0.246377 * windowWidth,
    "height": 0.10379 * windowHeight,
    "left": 22/414 * windowWidth,
    "top": 18/896 * windowHeight,
  },

  proceedBtnStyle: {
    "position": "absolute",
    "width": 1.2*0.8913 * windowWidth,
    "height": 1.2*0.0669 * windowHeight,
    "left": -0.05* windowWidth,
    "top": 0.125 * windowHeight,
  },

  totalText:
  {
    position: "absolute",
    "left": 0.0531 * windowWidth,
    "top": 0.21875 * windowHeight,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 30,
    lineHeight: 37,
    color: "#000000"
  },

  cartTotal: {
    position: "absolute",
    "height": 58/896 * windowHeight,
    "right": 30/414 * windowWidth,
    "top": 0.21875 * windowHeight,

    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 35,
    lineHeight: 40,
    color: "#0137F4",
  },

  itemName: {
    position: "absolute",
    "width": 250/414 * windowWidth,
    "left": 134/414 * windowWidth,
    "top": 24/896 * windowHeight,
    textAlign: 'left',


    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: 19,
    color: "#000000",
  },

  itemPrice: {
    position: "absolute",
    "left": 0.32 * windowWidth,
    "top": 75/896 * windowHeight,
    textAlign: 'center',

    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 24,
    lineHeight: 28,
    color: "#000000",
  },

  itemQuantity: {
    position: "absolute",
    "right": 84/414 * windowWidth,
    "top": 84/896 * windowHeight,
    textAlign: 'center',


    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 30,
    lineHeight: 37,
    color: "#000000",
  },

  InputStyle1:
  {
    position: "absolute",
    "width": 0.7101449275362319 * windowWidth,
    "height": 0.0357142857142857 * windowHeight,
    "left": 15/414 * windowWidth,
    "top": 60/896 * windowHeight,
    paddingLeft: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
});
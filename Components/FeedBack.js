import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, } from 'react-native';

import fire from './firebase';
import 'firebase/database'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

export default function FeedBack({navigation, route}){
    const [orderNo, setorderNo] = React.useState(route.params ? route.params : null);
    //const [orderNo, setorderNo] = React.useState(1);
    const [keypar,setKey] = React.useState()
    React.useEffect(() => {
    fire.database().ref('Orders').orderByChild('OrderNo').equalTo(orderNo).on('value',snap=>{
        snap.forEach((child=>{setKey(child.key)
        }))        
    })
}, []);

console.log(keypar)
    return(
        <View style={{flex: 1}}>
            <ImageBackground source={require('../assets/background.png')} style={styles.bgimage}>
                <TouchableOpacity style={styles.backarrow} onPress={() => navigation.navigate("admincart")}>
                    <Image source={require('../assets/backarrow.png')} style={{resizeMode:'contain', width: '100%', height: '100%'}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentbtn} onPress={() => {
                    fire.database().ref("Orders/"+keypar).update({
                        Status: "R"
                    })
                    navigation.navigate("adminOrderScreen")}}>
                    <Image source={require('../assets/Paymentbtn.png')} style={{resizeMode: 'contain', width: '100%', height: '100%'}} />
                </TouchableOpacity> 
                <TouchableOpacity style={styles.orderaccept} onPress={() =>  {
                    fire.database().ref("Orders/"+keypar).update({
                        Status: "G"
                    })
                    navigation.navigate("adminOrderScreen")}
                    } >
                    <Image source={require('../assets/OrderAcceptbtn.png')} style={{resizeMode: 'contain', width: '100%', height: '100%'}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelbtn} onPress={() =>  {
                    fire.database().ref("Orders/"+keypar).update({
                        Status: "D"
                    })
                   navigation.navigate("adminOrderScreen")}}>
                    <Image source={require('../assets/cancelbtn.png')} style={{resizeMode: 'contain', width: '100%', height: '100%'}}  />
                </TouchableOpacity>



            </ImageBackground>
        </View>


    )


} 

const styles = StyleSheet.create({
    bgimage: {
        position: "relative",
        resizeMode:'contain',
        "width": windowWidth,
        "height": windowHeight
      },
    backarrow: {
        "position": "absolute",
        "width": 29/414 * windowWidth,
        "height": 21/896 * windowHeight,
        "left": 20/414 * windowWidth,
        "top": 45/896 * windowHeight
      },
    paymentbtn: {
        "position": "absolute",
        "width": 351.09/414 * windowWidth,
        "height": 65/896 * windowHeight,
        "left": 37/414 * windowWidth,
        "top": 159/896 * windowHeight
      },  
    orderaccept: {
        "position": "absolute",
        "width": 351.09/414 * windowWidth,
        "height": 65/896 * windowHeight,
        "left": 37/414 * windowWidth,
        "top": 295/896 * windowHeight
      }, 
    cancelbtn: {
        "position": "absolute",
        "width": 351.09/414 * windowWidth,
        "height": 65/896 * windowHeight,
        "left": 37/414 * windowWidth,
        "top": 431/896 * windowHeight
      },   
})
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { render } from 'react-dom';
import { color } from 'react-native-reanimated';
import *as Permissions from 'expo-permissions' 
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",

    }
  }

  getCameraPermissions =async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false


    })
    
  }

  handleBarCodeScan =async(type, data)=>{
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal"

    })

  }

  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === 'clicked' && hasCameraPermissions){
      return(
        <BarCodeScanner
        onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScan} 
        style = {StyleSheet.absoluteFillObject}
         /> 
        
      );



    }

    else if (buttonState === 'normal') {
      return (
        <View style = {styles.container}>
            <Text style = {styles.textStyle}>
                Barcode Scanner
            </Text>
            <Text>
               {hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permissions"}
            </Text>

            <TouchableOpacity 
            style = {styles.buttonBackground} 
            onPress = {this.getCameraPermissions}
            >
            <Text style = {{color: "white", textAlign: "center"}}>
              Scan QR Code
              </Text>  

            </TouchableOpacity>
        </View>
    );


                  
    }
  } 

  }

  const styles = StyleSheet.create({
    container : {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'

    },

    buttonBackground : {
      backgroundColor: "black",
      width: 250,
      textAlign: 'center',
      marginTop: 20,
      padding: 15,
      height: 55,
      borderRadius: 6
    },

    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'

    }
  })
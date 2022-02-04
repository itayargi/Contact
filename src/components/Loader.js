import {  ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

const Loader = (props) => {
  const {onlyLoder} = props

  if(onlyLoder) return <ActivityIndicator size="large" color={Colors.colorSeafoamBlue} />
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.colorSeafoamBlue} />
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})
export default Loader;


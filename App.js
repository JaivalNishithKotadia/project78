import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import SignupLoginScreen from './screens/SignupLoginScreen'


export default class App extends React.Component {
  render(){
  return (
     <View style={styles.container}>
     <SignupLoginScreen/>
     </View>
      
    
  );
  }
}

const styles = StyleSheet.create({
   container:{
     backgroundColor:'#FFE0B2',
     alignItems:'center',
     alignContent:"center",
     alignSelf:"center",
     justifyContent:"center"
   }
});

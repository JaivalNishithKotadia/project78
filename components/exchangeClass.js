import * as React from "react";
import LottieView from "lottie-react-native";

export default class ExchangeClass extends React.Component {
  render() {
    return (
      <LottieView
        source={require("./exchange.json")}
        style={{
          
         
          
          alignItems: "center",
          justifyContent: "center",
          alignSelf:'center',
          alignContent:'center',
          marginBottom:50
        }}
        autoPlay
        loop
      />
    );
  }
}

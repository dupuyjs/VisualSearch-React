

import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "react-navigation";
import { createAppContainer } from "@react-navigation/native"

import { FetchVisualSearch } from "./src/components/FetchVisualSearch";
import { MainScreen } from "./src/components/MainScreen";
import { CameraScreen } from "./src/components/CameraScreen";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen f</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  MainScreen: { screen: MainScreen },
  FetchVisualSearch: { screen: FetchVisualSearch },
  CameraScreen: { screen: CameraScreen }
});

export default createAppContainer(AppNavigator);

// ------------------------------------------

// import { createStackNavigator  } from 'react-navigation';
// import { createAppContainer   } from "@react-navigation/native";

// let s = "dede";

// console.log(s);


// const AppNavigator = createStackNavigator({
//   // MainScreen: { screen: MainScreen },
//   // FetchVisualSearch: { screen: FetchVisualSearch },
//    StartWorking: { screen: StartWorking }
// });

// export default createAppContainer(AppNavigator);
 // ---------------------------------------------------

// import React from 'react';
// import {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

//  type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.tsx bro !!</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

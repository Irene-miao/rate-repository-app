import React from "react";
import { View, Text,  StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import {Link} from 'react-router-native';


const styles = StyleSheet.create({
  container: {
      display:  "flex",
      flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    margin: 10,
    padding: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginRight: 20,
  },
});



const AppBar = () => {
  return (
      <View style={styles.container}>
          <ScrollView horizontal={true}>
          <Link to="/"><Text style={styles.text}>Repositories</Text></Link>
              <Link to="/signin"><Text style={styles.text}>Sign In</Text></Link>
          </ScrollView>
              
      </View>
  );
};

export default AppBar;

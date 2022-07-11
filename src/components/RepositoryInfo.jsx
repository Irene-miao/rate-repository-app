import React from 'react';
import {
    Text,
    StyleSheet,
    Pressable,
    View,
  } from "react-native";
  import theme from "../theme";
  import * as Linking from "expo-linking";
  import RepositoryItem from "./RepositoryItem";

  

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 15,
      margin: 10,
    },
    buttonText: {
      textAlign: "center",
      color: "white",
      fontSize: theme.fontSizes.subheading,
    },
    button: {
      borderRadius: theme.roundness,
      padding: 5,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
    }
  });




const RepositoryInfo = ({ repository }) => {
    console.log(repository);
  
    return (
      <View style={styles.container}>
        <RepositoryItem item={repository} />
        <Pressable
          onPress={() => {
            Linking.openURL(repository?.url);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#020202" : "#1E90FF",
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
    );
  };
  

  export default RepositoryInfo;
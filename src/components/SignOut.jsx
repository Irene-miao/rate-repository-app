import React, {useEffect} from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient, useQuery } from "@apollo/client";
import {GET_ME} from '../graphql/queries';
import theme from '../theme';


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  text: {
fontSize: theme.fontSizes.body,
fontWeight: theme.fontWeights.normal,
  }
});


const SignOut =  () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const { data} = useQuery(GET_ME);
  

useEffect(async() => {
await authStorage.removeAccessToken();
client.resetStore();
}, []);
    
console.log(data);
  
  
  

  return (
    <View style={styles.container}>
      <Text>You are signed out. Click Sign In tab to sign in</Text>
    </View>
  );
};

export default SignOut;

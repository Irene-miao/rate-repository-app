import React  from "react";
import { View,  StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import {Link} from 'react-router-native';
import theme from '../theme';
import Text from './Text';
import {GET_ME} from '../graphql/queries';
import { useQuery } from '@apollo/client';


const styles = StyleSheet.create({
  container: {
      display:  "flex",
      flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
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
  const {data} = useQuery(GET_ME);


console.log(data);
const me = data?.me;
console.log(me);

return (
  <View style={styles.container}>
      <ScrollView horizontal={true}>
      <Link to="/"><Text style={styles.text}>Repositories</Text></Link>
         { me === null  ? (<Link to="/signin"><Text style={styles.text}>Sign In</Text></Link>) :
          (<Link to="/signout"><Text style={styles.text}>Sign Out</Text></Link>)}
      </ScrollView>       
  </View>
);

};



  

export default AppBar;

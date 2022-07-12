import React from "react";
import {  Image, TouchableOpacity, View, StyleSheet } from "react-native";
import theme from '../theme';
import Text from './Text';


const RepositoryItem = ({ item }) => {
  console.log(item);

  return (
  <View  testID="repositoryItem" style={styles.item}>
        <View style={styles.row}>
        <Image
        style={styles.img}
        source={{
          uri: item.ownerAvatarUrl,
        }}
      />
      <View style={styles.column}>
        <Text  style={styles.header}>{item.fullName}</Text>
        <Text    style={styles.subheading}>{item.description}</Text>
        <TouchableOpacity style={styles.button}>
          <Text   style={styles.btnText}>{item.language}</Text>
        </TouchableOpacity>
      </View>
        </View>
      
    <View style={styles.row2}>
    <View style={styles.column}>
        <Text   style={styles.headerOne}>
          {(item.stargazersCount / 1000).toFixed([1])}k
        </Text>
        <Text style={styles.text}>Stars</Text>
      </View>
      <View style={styles.column}>
        <Text    style={styles.headerOne}>
          {" "}
          {(item.forksCount / 1000).toFixed([1])}k
        </Text>
        <Text style={styles.text}>Forks</Text>
      </View>
      <View style={styles.column}>
        <Text   style={styles.headerOne}> {item.reviewCount}</Text>
        <Text style={styles.text}>Reviews</Text>
      </View>
      <View style={styles.column}>
        <Text    style={styles.headerOne}> {item.ratingAverage}</Text>
        <Text style={styles.text}>Rating</Text>
      </View>
    </View>
    </View>

    
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 5,
    margin: 5,
    backgroundColor: "white",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
    margin: 5,
  },
  row2: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: 170,
      marginLeft: 15,
      marginRight: 15,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    marginLeft: 5,
    padding: 5,
  },
  img: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: theme.roundness,
  },
  header: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  headerOne: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  subheading: {
    fontSize: theme.fontSizes.body,
    color: "grey",
    width: 280,
    paddingBottom: 5,
    paddingTop: 5,
  },
  button: {
    padding: 5,
    width: "45%",
    borderRadius: theme.roundness,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
  btnText: {
    color: "white",
    fontSize: theme.fontSizes.body,
  },
  text: {
    color: "grey",
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

export default RepositoryItem;

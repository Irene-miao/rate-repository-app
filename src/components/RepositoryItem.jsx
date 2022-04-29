import React from "react";
import { Text, Image, TouchableOpacity, View, StyleSheet } from "react-native";

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.item}>
        <View style={styles.row}>
        <Image
        style={styles.img}
        source={{
          uri: item.ownerAvatarUrl,
        }}
      />
      <View style={styles.column}>
        <Text style={styles.header}>{item.fullName}</Text>
        <Text style={styles.subheading}>{item.description}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>{item.language}</Text>
        </TouchableOpacity>
      </View>
        </View>
      
    <View style={styles.row2}>
    <View style={styles.column}>
        <Text style={styles.headerOne}>
          {(item.stargazersCount / 1000).toFixed([1])}k
        </Text>
        <Text style={styles.text}>Stars</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.headerOne}>
          {" "}
          {(item.forksCount / 1000).toFixed([1])}k
        </Text>
        <Text style={styles.text}>Forks</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.headerOne}> {item.reviewCount}</Text>
        <Text style={styles.text}>Reviews</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.headerOne}> {item.ratingAverage}</Text>
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
    borderRadius: 5,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
  },
  headerOne: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subheading: {
    fontSize: 14,
    color: "grey",
    width: 280,
    paddingBottom: 5,
    paddingTop: 5,
  },
  button: {
    padding: 5,
    width: "50%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0366d6",
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
  text: {
    color: "grey",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RepositoryItem;

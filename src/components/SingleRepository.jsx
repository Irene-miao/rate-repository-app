import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import {
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../theme";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    margin: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
    margin: 5,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    marginLeft: 10,
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
    borderColor: "#1E90FF",
    backgroundColor: "white",
    borderWidth: 3,
  },
  roundButtonText: {
    color: "#1E90FF",
    fontSize: 18,
    fontWeight: theme.fontWeights.bold,
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
  },
  header: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  subheading: {
    color: "grey",
    fontSize: theme.fontSizes.subheading,
  }, 
  paragraph: {
    marginLeft: 60,
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

const ReviewItem = ({ review }) => {
  console.log(review);
const date = new Date(review.createdAt);
console.log(date);
const newDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
console.log(newDate);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.roundButton}>
          <Text style={styles.roundButtonText}>{review.rating}</Text>
        </TouchableOpacity>
        <View style={styles.column}>
        <Text style={styles.header}>{review.user?.username}</Text>
        <Text style={styles.subheading}>{newDate}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.paragraph}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  console.log(id);

  const { data, loading, error } = useQuery(GET_REVIEWS, {
    variables: {
      repositoryId: id,
    },
  });

  if (loading) {
    return null;
  }

  if (error) {
    console.log(error);
  }

  const repository = data ? data.repository : null;
  console.log(repository);

  const reviews = data
    ? data?.repository?.reviews?.edges.map((edge) => edge.node)
    : null;
  console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_REVIEW } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from './ReviewItem';
import {
  Text,
  StyleSheet,
  Pressable,
  FlatList,
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



const SingleRepository = () => {
  const { id } = useParams();
  console.log(id);

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY_REVIEW, {
    variables: {
      repositoryId: id,
      first: 4,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return null;
  }

  if (error) {
    console.log(error);
  }
  console.log(data);

  const  handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
  
    if (!canFetchMore) {
      return;
    };
  
    fetchMore({
      variables: {
        after: data?.repository?.reviews.pageInfo.endCursor,
 
      },
    });
  };

 const onEndReach = () => {
  fetchMore ? handleFetchMore(): null;
  console.log("Reached the end")
 };
 
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
      onEndReached={onEndReach}
      onEndReachedThreshold={1}
    />
  );
};

export default SingleRepository;

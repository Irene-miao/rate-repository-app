import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_REVIEW } from "../graphql/queries";
import ReviewItem from './ReviewItem';
import {
  FlatList
} from "react-native";
import RepositoryInfo from './RepositoryInfo';



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

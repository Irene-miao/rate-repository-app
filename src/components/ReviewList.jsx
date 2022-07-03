import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import ReviewItem from './ReviewItem';
import {FlatList} from 'react-native';


const ReviewList =() => {
    const {data, loading, error, fetchMore, refetch} = useQuery(GET_ME, {
        fetchPolicy: "cache-and_network",
        variables: {
includeReviews: true
        }
    });

    const  handleFetchMore = () => {
        const canFetchMore = !loading && data?.me?.reviews?.pageInfo?.hasNextPage;
      
        if (!canFetchMore) {
          return;
        };
      
        fetchMore({
          variables: {
            after: data?.me?.reviews.pageInfo.endCursor,
     
          },
        });
      };
    
     const onEndReach = () => {
      fetchMore ? handleFetchMore(): null;
      console.log("Reached the end")
     };

    const reviews = data
    ? data?.me?.reviews?.edges.map((edge) => edge.node)
    : null;
console.log(reviews); 

    return (
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
          keyExtractor={({ id }) => id}
          onEndReached={onEndReach}
          onEndReachedThreshold={1}
        />
      );
    };

 
export default ReviewList;
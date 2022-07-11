import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

//import { useState, useEffect } from "react";


export const useRepositories = ({variables}) => {
  /*const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState();

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace IP address with own
    const response = await fetch("http://192.168.0.197:5000/api/repositories");
    const json = await response.json();

    console.log(json);
    setLoading(false);
    setRepositories(json);
  };

  // Save the data into state once app initialize
  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};*/

console.log(variables);

const { data, error, loading, fetchMore, ...result} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
     variables,
  });

  const  handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage;
  
    if (!canFetchMore) {
      return;
    };
  
    fetchMore({
      variables: {
        after: data?.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

console.log(data)

  return {
repositories: data,
fetchMore: handleFetchMore,
loading,
error,
...result,
  }
};



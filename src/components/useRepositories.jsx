import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES_PAGINATED } from "../graphql/queries";


export const useRepositories = (variables) => {
    console.log(variables);
    const { data, error, loading, fetchMore, ...result} = useQuery(GET_REPOSITORIES_PAGINATED, {
        fetchPolicy: "cache-and-network",
        variables: variables,
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

const paginatedRepositories = data ? data?.repositories.edges.map(edge => edge.node) : [];

      return {
repositories: paginatedRepositories,
fetchMore: handleFetchMore,
loading,
...result,
      }
};
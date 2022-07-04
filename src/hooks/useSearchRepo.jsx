import { useQuery } from "@apollo/client";
import {  SEARCH } from "../graphql/queries";




export const useSearchRepo = ({variables}) => {
    const { data, error, loading, ...result} = useQuery(SEARCH, {
        fetchPolicy: "cache-and-network",
        variables: variables,
      });

      console.log(data);
   
      const searchRepositories = data ? data?.repositories.edges.map(edge => edge.node) : [];
      console.log(searchRepositories);

      return {
        searchRepositories,
...result
      }

};
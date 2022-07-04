import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES_ORDERBY } from "../graphql/queries";


export const useOrderByRepo = ({variables}) => {
    const { data, error, loading} = useQuery(GET_REPOSITORIES_ORDERBY, {
        fetchPolicy: "cache-and-network",
        variables: variables ,
      });
  
     

      console.log(data);
     
      const OrderByRepositories = data ? data?.repositories.edges.map(edge => edge.node) : [];
      console.log(OrderByRepositories);

      return {OrderByRepositories};
};
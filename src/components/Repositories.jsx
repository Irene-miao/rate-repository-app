import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES_ORDERBY, SEARCH } from "../graphql/queries";
import RepositoryListContainer from './RepositoryListContainer';
import {useNavigate} from 'react-router-dom';


 const Repositories = ({variables}) => {
  console.log(variables.searchKeyword);
    const { data, error, loading } = useQuery(GET_REPOSITORIES_ORDERBY, {
        fetchPolicy: "cache-and-network",
        variables: variables ,
      });
  
      const {
        data: searchData,
        error: searchError,
        loading: searchLoading,
      } = useQuery(SEARCH, {
        fetchPolicy: "cache-and-network",
        variables: variables,
      });

    
      console.log(data);
      console.log(searchData);

const searchRepositories = searchData ? searchData?.repositories.edges.map(edge => edge.node) : [];
const repositories = data ? data?.repositories.edges.map(edge => edge.node) : [];
console.log(repositories);
console.log(searchRepositories);

if (variables.orderBy && variables.orderDirection) {
  return (<RepositoryListContainer navigate={useNavigate()} repositories={repositories}  />);
} else if (variables.searchKeyword) {
  return (<RepositoryListContainer navigate={useNavigate()} repositories={searchRepositories} />);
};
   
};

export default Repositories;

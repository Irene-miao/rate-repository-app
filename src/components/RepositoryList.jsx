import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

import RepositoryItem from './RepositoryItem';
import {useQuery} from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/queries';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    
});


  const ItemSeparator = () => <View style={styles.separator} />;


  const RepositoryList = () => {
    const {data, error, loading} =useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });
 if(loading){
     return <Text>Loading...</Text>
 }
if (error){
    console.log(error);
};
console.log(data);
// Get nodes from the edges array
const repositoryNodes = data ?
data.repositories.edges.map(edge => edge.node)
: [];



    return (
        <FlatList
        data={repositoryNodes}
        renderItem={({item}) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.fullName}
        ItemSeparatorComponent={ItemSeparator}
        />
    );
  };



  export default RepositoryList;
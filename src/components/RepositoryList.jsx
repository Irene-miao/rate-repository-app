import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';



const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    
});


  const ItemSeparator = () => <View style={styles.separator} />;


  const RepositoryList = () => {
    const {repositories} =useRepositories();


// Get nodes from the edges array
const repositoryNodes = repositories 
? repositories.edges.map(edge => edge.node)
: [];
console.log(repositories);

    return (
        <FlatList
        data={repositoryNodes}
        renderItem={({item}) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        />
    );
  };



  export default RepositoryList;
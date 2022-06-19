import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    
});


const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryListContainer = ({repositories}) => {
const repositoryNodes = repositories ?
repositories?.edges.map(edge => edge.node)
: [];



    return (
        <FlatList
        data={repositoryNodes}
        renderItem={({item}) => <RepositoryItem  item={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default RepositoryListContainer;
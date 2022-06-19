import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import {useNavigate} from 'react-router-dom';

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
let navigate = useNavigate();
console.log(repositoryNodes);

    return (
        <FlatList
        data={repositoryNodes}
        renderItem={({item}) => <Pressable onPress={() => {
            navigate(`/${item.id}`, {replace:true})
        }}> 
            <RepositoryItem  item={item} />
            </Pressable>}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default RepositoryListContainer;
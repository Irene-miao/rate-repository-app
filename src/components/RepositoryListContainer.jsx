import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import {useNavigate} from 'react-router-dom';
import RepositoryListMenu from './RepositoryListMenu';
import {useQuery} from '@apollo/client';
import { GET_REPOSITORIES_ORDERBY } from '../graphql/queries';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});


const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryListContainer = ({orderBy, orderDirection}) => {
        const { data, error, loading } = useQuery(GET_REPOSITORIES_ORDERBY, {
            fetchPolicy: 'cache-and-network',
            variables: {
                orderBy: orderBy,
                orderDirection: orderDirection
            }
        });

 

console.log(data);

const repositoryNodes = data ?
data?.repositories?.edges.map(edge => edge.node)
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
        ListHeaderComponent={() => <RepositoryListMenu />}
        />
    );
};

export default RepositoryListContainer;
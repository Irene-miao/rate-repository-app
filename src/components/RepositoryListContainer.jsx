import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import {useNavigate} from 'react-router-dom';
import RepositoryListMenu from './RepositoryListMenu';
import {useQuery} from '@apollo/client';
import { GET_REPOSITORIES_ORDERBY, SEARCH } from '../graphql/queries';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});


const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryListContainer = ({variables}) => {
        const { data, error, loading } = useQuery(GET_REPOSITORIES_ORDERBY, {
            fetchPolicy: 'cache-and-network',
            variables: variables,
        });
        const {data: searchData, error: searchError, loading: searchLoading} = useQuery(SEARCH, {
            fetchPolicy: 'cache-and-network', 
            variables: variables,
            })
 

console.log(data);
console.log(searchData);

const searchRepositories =  searchData?.repositories.edges.map(edge => edge.node) ;
const Repositories =  data?.repositories?.edges.map(edge => edge.node) ;

const selectData = searchData ? searchRepositories : Repositories ;
console.log(selectData);

let navigate = useNavigate();

    return (
        <FlatList
        data={selectData}
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
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const RepositoryItem = ({item}) => {
    return (
        <View style={styles.item}>
            <Text>Full Name: {item.fullName}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Language: {item.language}</Text>
            <Text>Stars: {item.stargazersCount}</Text>
            <Text>Forks: {item.forksCount}</Text>
            <Text>Reviews: {item.reviewCount}</Text>
            <Text>Rating: {item.ratingAverage}</Text>
        </View>
    );
  };

const styles = StyleSheet.create({
    item: {
        padding: 10,
        margin: 5,
    },
});
  
  export default RepositoryItem;
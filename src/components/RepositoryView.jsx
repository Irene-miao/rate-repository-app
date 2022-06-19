import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import { Text, StyleSheet, Pressable } from "react-native";
import theme from '../theme';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    buttonText: {

      textAlign: "center",
      color: "white",
      fontSize: theme.fontSizes.subheading,
    },
    button: {
      borderRadius: theme.roundness,
      padding: 5,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
    },
  });


const RepositoryView = () => {
    
  let { id } = useParams();
  console.log(id);
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { 
        repositoryId: id,
    }
    
  });

 if (loading) {
    return null
 }
if (error) {
    console.log(error)
}

  console.log(data);
const repository = data ? data.repository : null;


  return (
    <>
    <RepositoryItem item={repository} /> <Pressable onPress={() => {
        Linking.openURL(repository?.url);
    }}
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? "white" : "#1E90FF",
      },
      styles.button,
    ]}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
    </>
    
  );
};

export default RepositoryView;

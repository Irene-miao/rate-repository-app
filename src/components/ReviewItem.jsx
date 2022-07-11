import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Alert
} from "react-native";
import theme from '../theme';
import {useNavigate}  from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";



const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    margin: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    margin: 5,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    marginLeft: 10,
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
    borderColor: "#1E90FF",
    backgroundColor: "white",
    borderWidth: 3,
  },
  roundButtonText: {
    color: "#1E90FF",
    fontSize: 18,
    fontWeight: theme.fontWeights.bold,
  },
  header: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  subheading: {
    color: "grey",
    fontSize: theme.fontSizes.subheading,
  }, 
  paragraph: {
    justifyContent: "center",
    width: "60%"
  },
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



const ReviewItem = ({ review, refetch }) => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
    const date = new Date(review?.createdAt);
    const newDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    let navigate = useNavigate();
  


    const handleView = () => {
      navigate( `/${review?.repositoryId}`,  {replace:true });
    };

    
  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
       [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            const id = review.id;
            await mutate({variables: {deleteReviewId: id}})
          refetch();
        },
        },
       ],
       {cancelable: false},
      );
      return true;

      
console.log(result);
  }

      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.roundButton}>
              <Text style={styles.roundButtonText}>{review.rating}</Text>
            </TouchableOpacity>
            <View style={styles.column}>
           {review.repository ? <Text style={styles.header}> {review?.repository?.ownerName} / {review?.repository?.name}</Text> : <Text>{review.user?.username}</Text>}
            <Text style={styles.subheading}>{newDate}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.paragraph}>{review.text}</Text>
          </View>
          <View style={styles.row}>
          <Pressable
              onPress={handleView}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#020202" : "#1E90FF",
                },
                styles.button,
              ]}
            >
              <Text style={styles.buttonText}>View repository</Text>
            </Pressable>
            <Pressable
              onPress={handleDelete}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#020202" : "#BA1F33",
                },
                styles.button,
              ]}
            >
              <Text style={styles.buttonText}>Delete review</Text>
            </Pressable>
          </View>
        </View>
      );
    };

    export default ReviewItem;
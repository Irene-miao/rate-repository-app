import React from "react";
import Text from "./Text";
import { StyleSheet, Pressable, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import { Formik, setNestedObjectValues } from "formik";
import * as yup from "yup";
import { useMutation} from '@apollo/client';
import {CREATE_REVIEW} from '../graphql/mutations';
import {useNavigate} from 'react-router-dom';



const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
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

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const ReviewContainer = () => {
 
  const [mutate, result] = useMutation(CREATE_REVIEW);
let navigate = useNavigate();

const onSubmit = async(values) => {
  const {ownerName, repositoryName, reviewRating, text} = values;
  console.log(ownerName, repositoryName, rating, text);
  let rating = parseInt(reviewRating);
  console.log(rating);
  const {data} = await mutate({variables: {review: {ownerName, repositoryName, rating, text}}})
  console.log(data);
  navigate(`/${data?.createReview?.repositoryId}`, {replace:true});
};






  const ReviewForm = ({ onSubmit }) => {
    return (
      <View style={styles.container}>
        <FormikTextInput name="ownerName" placeholder="Owner_name" />
        <FormikTextInput name="repositoryName" placeholder="Repository_name" />
        <FormikTextInput name="reviewRating" placeholder="Rating" />
        <FormikTextInput name="text" placeholder="Text" multiline={true} />
        <Pressable
          onPress={onSubmit}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#020202" : "#1E90FF",
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    );
  };

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required("Owner name is required")
      .min(3, "Owner name must be at least 3 characters long"),
    repositoryName: yup
      .string()
      .required("Repository Name is required"),
    //.matches(/(?=.*[0-9])/, "Password must contain a number."),
    reviewRating: yup.number().required("Rating is required").min(0).max(100),
    text: yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewContainer;

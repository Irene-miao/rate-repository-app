import React from "react";
import Text from "./Text";
import { StyleSheet, Pressable, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation} from '@apollo/client';
import {CREATE_USER} from '../graphql/mutations';
import {useNavigate} from 'react-router-dom';
import useSignIn from '../hooks/useSignIn';


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
  input: {
    height: 100,
  }
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const SignUpContainer = () => {
 const [signIn] = useSignIn();
  const [mutate] = useMutation(CREATE_USER);
let navigate = useNavigate();

const onSubmit = async(values) => {
  const {username, password, passwordConfirmation} = values;
  console.log(username, password, passwordConfirmation);
  const {data} = await mutate({variables: {user: {username, password}}});
  console.log(data);
  await signIn({username, password});
  console.log(result);
  navigate("/", {replace:true});
};






  const SignUpForm = ({ onSubmit }) => {
    return (
      <View style={styles.container}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry={true}/>
        <FormikTextInput name="passwordConfirmation" placeholder="Password Confirmation" secureTextEntry={true}/>

        <Pressable
          onPress={onSubmit}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#020202" : "#1E90FF",
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    );
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(1)
      .max(30),
    password: yup
      .string()
      .required("Password is required")
      .min(5)
      .max(50),
    //.matches(/(?=.*[0-9])/, "Password must contain a number."),
    passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords must match")
    .required("Password confirmation is required"),
   
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUpContainer;

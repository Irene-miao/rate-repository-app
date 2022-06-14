import React from "react";
import Text from "./Text";
import { StyleSheet, Pressable, View } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import theme from "../theme";
import useSignIn from './useSignIn';
import { useNavigate} from 'react-router-dom';




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
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <Pressable
        onPress={onSubmit}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "white" : "#1E90FF",
          },
          styles.button,
        ]}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    //.matches(/(?=.*[0-9])/, "Password must contain a number."),
});

const SignIn = () => {
  const [signIn] = useSignIn();
 let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const {data } = await signIn({ username, password});
     console.log(data);
     data ? navigate("/", {replace:true}) : null;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;

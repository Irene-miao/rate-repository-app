import React from "react";
import Text from "./Text";
import { StyleSheet, Pressable, View } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";

const styles = StyleSheet.create({
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
    },
    button: {
borderRadius: 8,
padding: 5,
marginLeft: 10,
marginRight: 10,
    }
})

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username"  />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <Pressable 
      onPress={onSubmit}
      style={({ pressed }) => [
          {
              backgroundColor: pressed
              ? 'white': '#1E90FF' 
          },
          styles.button
      ]}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
 const onSubmit = (values) => {
     console.log(values);
 };
  return (
<Formik initialValues={initialValues} onSubmit={onSubmit}>
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
</Formik>
  );
};

export default SignIn;

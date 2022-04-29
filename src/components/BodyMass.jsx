import { Formik } from "formik";
import React from "react";
import { Text, Pressable, View, Alert } from "react-native";
import FormikTextInput from './FormikTextInput';


const initialValues = {
    mass:"",
    height:"",
};

const getBodyMassIndex = (mass, height) => {
    return Math.round(mass / Math.pow(height ,2));
};


const BodyMassIndexForm = ({ onSubmit }) => {
 return (
     <View>
         <FormikTextInput name="mass" placeholder="Weight (kg)" />
         <FormikTextInput name="height" placeholder="Height (m)" />
         <Pressable onPress={onSubmit}>
             <Text>Calculate</Text>
         </Pressable>
     </View>
 );
};

const BodyMass = () => {
    const onSubmit = values => {
        const mass = parseFloat(values.mass);
        const height = parseFloat(values.height);

        if (!isNaN(mass) && !isNaN(height) && height !== 0) {
            Alert.alert(`Your body mass index is: ${getBodyMassIndex(mass, height)}`);
        }
    };
     return (
         <Formik initialValues={initialValues} onSubmit={onSubmit}>
             {({ handleSubmit }) => <BodyMassIndexForm onSubmit={handleSubmit} />}
         </Formik>
     );
};


export default BodyMass;
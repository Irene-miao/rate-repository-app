import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        color: "#d73a4a",
        padding: 5,
        fontSize: 16,
        marginLeft: 10,
    },
    inputText: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    }, 
    errorBox: {
        borderWidth: 1,
        borderColor: "#d73a4a",
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    }
});

const FormikTextInput = ({ name, ...props}) => {
    const [field, meta, helpers] = useField(name);
    
    // Check if the field is touched and the error message is present
    const showError = meta.touched && meta.error;
 console.log(showError);
    return (
        <>
        <TextInput
        style={showError ? styles.errorBox : styles.inputText}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        />
        {/* Show the wrror message if the value of showError variable is true */}
        {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    
        
    );
};

export default FormikTextInput;
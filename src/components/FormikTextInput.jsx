import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        color: "red",
        padding: 5,
    },
    inputText: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    }
});

const FormikTextInput = ({ name, ...props}) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
        <TextInput
        style={styles.inputText}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        />
        {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    
        
    );
};

export default FormikTextInput;
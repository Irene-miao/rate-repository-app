import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    inputText: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: theme.roundness,
        padding: 10,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        fontFamily: theme.fonts.main,
    }, 
    error: {
        borderColor: theme.colors.error,
    }
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [
        styles.inputText,
        error && styles.error,
        style,
    ];

    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
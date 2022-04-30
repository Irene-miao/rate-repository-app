import React from 'react';
//import Constants from 'expo-constants';
import {  View,  StyleSheet} from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate} from 'react-router-native';
import SignIn from './SignIn';
import BodyMass from './BodyMass';
import theme from '../theme';



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
       backgroundColor: theme.colors.mainBackground,
    },
});





const Main = () => {

    return (
        <View style={styles.container}>
            <View>
                <AppBar />
            </View>
            <Routes>
            <Route path="/" element={<RepositoryList />} exact />
            <Route path="signin" element={<SignIn />}  />
            <Route path="bodymass" element={<BodyMass />}  />
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    )
};

export default Main;
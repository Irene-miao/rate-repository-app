import React from 'react';
//import Constants from 'expo-constants';
import {  View,  StyleSheet} from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate} from 'react-router-native';
import SignIn from './SignIn';
import SignOut from './SignOut';
import theme from '../theme';
import RepositoryView from './RepositoryView';


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
            <Route path="/:id" element={<RepositoryView />} />
            <Route path="signin" element={<SignIn />}  />
            <Route path="signout" element={<SignOut />}  />
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    )
};

export default Main;
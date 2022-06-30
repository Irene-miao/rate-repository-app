import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';





const httpLink = createHttpLink({
    // Replace the IP address with own
    uri: Constants.manifest.extra.apolloUri,

});




const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, {headers}) => {
        try {
            const accessToken = await authStorage.getAccessToken();
            console.log(accessToken);
            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : '',
                },
            };
        } catch (e) {
            console.log(e);
            return {
                headers,
            };
        }
    });
    
    
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
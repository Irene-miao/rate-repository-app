import { useMutation} from '@apollo/client';
import { AUTHENTICATE} from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';



const useSignIn = () => {
    const client = useApolloClient();
    const authStorage = useAuthStorage();

    const [mutate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password }) => {
       const {data} = await mutate({ variables: {credentials: {username, password}}});
       console.log(data.authenticate.accessToken);
        await authStorage.setAccessToken(data.authenticate.accessToken);
    client.resetStore();
        return {data};
        
    };
    
    return [signIn, result];
}

export default useSignIn;
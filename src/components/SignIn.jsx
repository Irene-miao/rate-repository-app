import React from "react";
import useSignIn from './useSignIn';
import { useNavigate} from 'react-router-dom';
import SignInContainer from "./SignInContainer";




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

return <SignInContainer onSubmit={onSubmit} />;
  
};

export default SignIn;

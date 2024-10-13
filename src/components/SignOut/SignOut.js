import React from 'react';
import { signOut } from 'firebase/auth';


function SignOut(props) {
   const { auth, setUser } = props;

   const signOutUser = async () => {
      await signOut(auth);
      setUser(null);
    };

   return (
      <button onClick={signOutUser}>Sign Out</button>
   );
}

export default SignOut;

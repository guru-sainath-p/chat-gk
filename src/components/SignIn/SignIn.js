import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

function SignIn(props) {
   const { auth, setUser } = props;
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSignInWithEmailAndPassword = async (e) => {
      e.preventDefault();
      // Prevent default form submission behavior

      try {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
         setUser(user);

         setEmail(''); // Clear email and password after successful login (optional)
         setPassword('');
      } catch (error) {
         console.error('Error signing in:', error);
      }
   };
   return (
      <>
         <form onSubmit={handleSignInWithEmailAndPassword} className='sign-in'>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input
               type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <button type="submit">Sign In</button>
         </form>
      </>);
};

export default SignIn;

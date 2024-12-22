import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
const [user, setUser] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const provider = new GoogleAuthProvider()

const userRegistration = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}
const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then(data => {
    setUser(data.user)
  })
  .catch(err => {
    console.log(err.message)
  })
}

const userLogout = () => {
    return signOut(auth)
}
const userData = {
    userRegistration,
    userLogin,
    userLogout,
    signInWithGoogle,
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
}

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

    return (
       <AuthContext.Provider value={userData}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;
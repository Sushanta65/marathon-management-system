import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
const [user, setUser] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')


const userRegistration = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}
const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}
const userData = {
    userRegistration,
    userLogin,
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
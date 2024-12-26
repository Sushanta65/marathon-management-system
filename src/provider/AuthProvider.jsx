import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import Swal from 'sweetalert2';

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

const signInWithGoogle = (navigate) => {
  signInWithPopup(auth, provider)
  .then(data => {
    setUser(data.user)
    navigate('/')
  })
  .catch(err => {
    console.log(err.message)
  })
}

const userLogout = () => {
  Swal.fire({
    title: "Are you sure want to Logout?",
    text: "You will logged Out.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout"
  }).then((result) => {
    if (result.isConfirmed) {
      
      Swal.fire({
        
        title: "Logout Successful.!",
        text: "You Logged Out from the website.",
        icon: "success"
        
      });
      return signOut(auth)
    }
  });
    
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
      if(currentUser?.email){
        const user = { email: currentUser.email}
        axios.post('http://localhost:5600/jwt', user, {withCredentials: true})
        .then(res => console.log(res.data))
      }
      else{
        axios.post('http://localhost:5600/logout', {}, {withCredentials: true})
        .then(res => console.log(res.data))
      }
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
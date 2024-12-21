import { createContext, useState } from 'react';

const AuthContext = createContext()

const AuthProvider = ({children}) => {
const [user, setUser] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')


const userRegistration = (email, password) => {

}

const userData ={name: 'sushanta'}

    return (
       <AuthContext.Provider value={userData}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;
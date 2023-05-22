/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider;

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }
    
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }


    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currenUser => {
            console.log(currenUser);
            setUser(currenUser);
            setLoading(false);
            if(currenUser && currenUser.email){
            const loggedUser = {
                email: currenUser.email
            };
                fetch('https://car-doctor-server-sakib669.vercel.app/jwt',
            {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(loggedUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log('jwt response ', data);
                // Warning: Local storage is not the best (second best place) to store access token
                localStorage.setItem('car-access-token', data.token);
            })
            }
            else{
                localStorage.removeItem('car-access-token');
            }
        })
        return () => {
            return unsubscribe();
        };
    }, [])

    const authInfo = {
        createUser,
        logIn,
        user,
        loading,
        logOut,
        googleLogin
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
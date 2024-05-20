import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from "react-router-dom";
import { auth } from '../../firebase/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthDetails.css'
const AuthDetails = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser)=>{
            if(authUser){
                setUser(authUser);
            }
            else{
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        }
    },[]);
    const handleSignOut = () =>{
        signOut(auth).then(() => {
            console.log("User Signed Out");
        })
        .catch((error) => {
            console.log(error);
        })
    }
  return (
    <div className="user-auth-container">{user ? <><button onClick={handleSignOut}> Sign Out</button> </>: 
    <div className="login-signup-container">
    <Link to="/login"> <button className="btn btn-outline-primary custom-outline-primary">Log In</button> </Link>
    <Link to="/signup"> <button class="btn btn-primary">Sign Up</button> </Link>
  </div> } </div>
  )
}

export default AuthDetails
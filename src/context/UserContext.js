import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const sharedContext = createContext();

const UserContext = ({children}) => {
    const [signInError, setsignInError] = useState(null);
    const [signUpError, setSignUpError] = useState(null);
    const [user, setUser] = useState(null);
    console.log(user);

    useEffect(()=>{
        const controller = new AbortController();
        const token = localStorage.getItem("Token");
        if(token){
            axios.get(`http://localhost:5000/getauth`, {
            headers: {
              authorization: `bearer ${localStorage.getItem("Token")}`,
            },
          }, {signal:controller.signal}).then(res => {
            if(res.data.success){
                setUser(res.data.userData);
            }
          }).catch(err => console.error('[Error]:', err))
        }
        return () => {
            controller.abort();
        }
    },[user?.email])


    const contextInfo = {
        signInError, 
        setsignInError,
        signUpError, 
        setSignUpError,
        user, 
        setUser
    };
    return (
        <div>
            <sharedContext.Provider value={contextInfo}>
                {children}
            </sharedContext.Provider>
        </div>
    );
};

export default UserContext;
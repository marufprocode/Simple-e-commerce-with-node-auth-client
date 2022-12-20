import React, { createContext, useState } from 'react';

export const sharedContext = createContext();

const UserContext = ({children}) => {
    const [signInError, setsignInError] = useState(null);
    const [signUpError, setSignUpError] = useState(null);
    const contextInfo = {
        signInError, 
        setsignInError,
        signUpError, 
        setSignUpError
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
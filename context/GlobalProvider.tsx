"use client";

import React, {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {currentUser, loginAnonymouslyUser} from "@/firebase/Config";

interface GlobalContextType {
    user: any;
    playPartyAnimation: boolean;
    setPlayPartyAnimation: Dispatch<SetStateAction<boolean>>;
    emailCopied: boolean;
    setEmailCopied: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}: { children: React.ReactNode }) => {
    const [play, setPlay] = useState<boolean>(false);
    const [emailCopied, setEmailCopied] = useState<boolean>(false);
    const [user, setUser] = useState<any>();

    const logUser = async () => {
        if(currentUser){
            setUser(currentUser);
            console.log("Current User Logged In")
        }else {
            const user = await loginAnonymouslyUser();
            setUser(user);
        }
    }
    useEffect(() => {
        logUser().then(() => console.log("New User Logged In"))
    }, []);
    return (
        <GlobalContext.Provider value={{
            setPlayPartyAnimation: setPlay,
            playPartyAnimation: play,
            emailCopied: emailCopied,
            setEmailCopied: setEmailCopied,
            user: user
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

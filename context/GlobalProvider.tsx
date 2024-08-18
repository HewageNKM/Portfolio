"use client";

import React, {createContext, useContext, useEffect, useState} from "react";
import {loginAnonymouslyUser} from "@/firebase/Config";
import {GlobalContextType} from "@/interfaces";

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}: { children: React.ReactNode }) => {
    const [play, setPlay] = useState<boolean>(false);
    const [emailCopied, setEmailCopied] = useState<boolean>(false);

    useEffect(() => {
        loginAnonymouslyUser().then(() => {
            console.log("User Logged in")
        });
    }, []);
    return (
        <GlobalContext.Provider value={{
            setPlayPartyAnimation: setPlay,
            playPartyAnimation: play,
            emailCopied: emailCopied,
            setEmailCopied: setEmailCopied,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

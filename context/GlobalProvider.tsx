"use client";

import React, {createContext, useContext, useEffect, useState} from "react";
import {loginAnonymouslyUser} from "@/firebase/Config";
import {GlobalContextType} from "@/interfaces";

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}: { children: React.ReactNode }) => {
    const [play, setPlay] = useState<boolean>(false);
    const [emailCopied, setEmailCopied] = useState<boolean>(false);
    const [user, setUser] = useState<any>();

    const logUser = async () => {
        const user = await loginAnonymouslyUser();
        setUser(user);
    }
    useEffect(() => {
        logUser().then(() => console.info("Anonymous User Logged In"));
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

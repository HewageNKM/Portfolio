"use client";


import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";

interface GlobalContextType {
    play: boolean;
    setPlay: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}: { children: React.ReactNode }) => {
    const [play, setPlay] = useState(false);
    return (
        <GlobalContext.Provider value={{play, setPlay}}>
            {children}
        </GlobalContext.Provider>
    );
};

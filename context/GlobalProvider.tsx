"use client";

import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";

interface GlobalContextType {
    playPartyAnimation: boolean;
    setPlayPartyAnimation: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}: { children: React.ReactNode }) => {
    const [play, setPlay] = useState<boolean>(false);
    return (
        <GlobalContext.Provider value={{
            setPlayPartyAnimation: setPlay,
            playPartyAnimation: play,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

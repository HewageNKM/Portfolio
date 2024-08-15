"use client";
import React, {createContext, useContext, useState} from "react";

const GlobalContext = createContext({});
export const useGlobalContext = ()=> useContext(GlobalContext)

export const GlobalProvider = ({children}:{children:React.ReactNode}) => {
    const [play,setPlay] = useState(false);
    return (
        <GlobalContext.Provider value={{play,setPlay}}>
            {children}
        </GlobalContext.Provider>
    );
};

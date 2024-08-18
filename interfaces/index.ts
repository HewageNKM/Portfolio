import {Dispatch, SetStateAction} from "react";

export interface Project {
    name: string;
    description: string;
    stack: string[];
    thumbnail: string;
    url: string;
}


export interface GlobalContextType {
    playPartyAnimation: boolean;
    setPlayPartyAnimation: Dispatch<SetStateAction<boolean>>;
    emailCopied: boolean;
    setEmailCopied: Dispatch<SetStateAction<boolean>>;
}
import { createContext } from "react";
export const Context=createContext({
    prevPrompts:[],
    presentPrompt:"",
    resultData:"",
    addSavedPrompts:()=>{}
})
import {create} from 'zustand'

export type storeType={
questionName:string, 
setQuestionName:(questionName:string)=>void, 
status:string, 
setStatus:(status:string)=>void, 
optionsName:string, 
setOptionsName:(optionsName:string)=>void
}

export const store =create<storeType>((set)=>({
questionName:'', 
setQuestionName:(questionName:string)=>set({questionName}), 
status:"", 
setStatus:(status:string)=>set({status}), 
optionsName:'', 
setOptionsName:(optionsName:string)=>set({optionsName})
}))


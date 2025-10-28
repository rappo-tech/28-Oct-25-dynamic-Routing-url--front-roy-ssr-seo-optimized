import {create} from 'zustand'

export type storeType={
selectedUser:string, 
setSelectedUser:(selectedUser:string)=>void, 
status:string, 
setStatus:(status:string)=>void, 
optionsName:string, 
setOptionsName:(optionsName:string)=>void
}

export const useStore =create<storeType>((set)=>({
selectedUser:'', 
setSelectedUser:(selectedUser:string)=>set({selectedUser}), 
status:"", 
setStatus:(status:string)=>set({status}), 
optionsName:'', 
setOptionsName:(optionsName:string)=>set({optionsName})
}))


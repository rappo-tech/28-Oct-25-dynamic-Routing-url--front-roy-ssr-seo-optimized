import {create} from 'zustand'


type userState={
channel:string,
setChannel:(channel:string)=>void,
msg:string, 
setMsg:(msg:string)=>void, 
status:string, 
setStatus:(status:string)=>void,
ws:WebSocket|null, 
setWs:(ws:WebSocket|null)=>void, 
isConnected:boolean, 
setIsConnected:(isConnected:boolean)=>void, 
sender:string, 
setSender:(sender:string)=>void, 
userName:string, 
setUserName:(userName:string)=>void
}

export const userStateStore=create<userState>((set)=>({
channel:'',
setChannel:(channel:string)=>set({channel}),
msg:'', 
setMsg:(msg:string)=>set({msg}), 
status:'', 
setStatus:(status:string)=>set({status}), 
isConnected:false, 
setIsConnected:(isConnected:boolean)=>set({isConnected}), 
ws:null, 
setWs:(ws:null|WebSocket)=>set({ws}), 
sender:'', 
setSender:(sender:string)=>set({sender}), 
userName:'', 
setUserName:(userName:string)=>set({userName})
}))



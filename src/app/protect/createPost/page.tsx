'use client'
import { userStateStore } from "@/zustandStore";
import { useState } from "react";
export default function CreatePost() {
const { ws,setWs,isConnected,setIsConnected}=userStateStore()
const[roomName,setRoomName]=useState<string>('')
const[msg,setMsg]=useState<string>('')
const[status,setStatus]=useState<string>('')

//join 
const join=()=>{
const socket= new WebSocket('ws://localhost:8080')

socket.onopen=()=>{
setWs(socket)
socket.send(JSON.stringify({action:"JOIN",roomName}))
setIsConnected(true)
}

socket.onmessage=(event)=>{
const parsedMsg=JSON.parse(event.data) as {type?:string,msg:string}
const {type,msg}=parsedMsg
if(type==='JOIN'){
setStatus(msg)
}else if(type==='MSG'){
setStatus(msg)
}
}

socket.onclose=()=>{
setWs(null)
setIsConnected(false)
}

}

//sendMsg
const sendMsg=()=>{
if(!ws)return 
if(ws.readyState===WebSocket.OPEN){
ws.send(JSON.stringify({action:"MSG",msg}))
}
}

return (<div>

<input
type="text"
placeholder="eneter your roomName"
value={roomName}
onChange={(e)=>setRoomName(e.target.value)}
/>
<button onClick={join}> join ws </button>
<p>{isConnected?"connected":'disconnected '}</p>


<input
type="text"
placeholder="eneter your msg"
value={msg}
onChange={(e)=>setMsg(e.target.value)}
/>

<button onClick={sendMsg}>send msg </button>



<p>warning:{status}</p>




</div>)
}




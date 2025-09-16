'use client'
import { userStateStore } from "@/zustandStore"
export default function UserOne() {

const {ws,setWs,isConnected,setIsConnected,
msg,setMsg ,status,setStatus,userName,setUserName,
sender,setSender
}=userStateStore()

//join 
const join=()=>{
const socket= new WebSocket('ws://localhost:8080')

socket.onopen=()=>{
setWs(socket)
socket.send(JSON.stringify({action:"JOIN",userName}))
setIsConnected(true)
}
socket.onmessage=(event)=>{
const parseddata =JSON.parse(event.data) as {type:string,msg:string}
if(parseddata.type==='JOIN'){
setStatus(parseddata.msg)
}else if(parseddata.type==='MSG'){
setStatus(parseddata.msg)
}
socket.onclose=()=>{
setWs(null)
setIsConnected(false)
}
}




}

// send msg 
const sendMsg=()=>{
if(!ws) return 
if(ws.readyState===WebSocket.OPEN){
ws.send(JSON.stringify({action:"MSG",msg,reciver:sender,userName}))
}
}

return (<div>

<input
type="text"
placeholder="enter userName"
value={userName}
onChange={(e)=>setUserName(e.target.value)}
/>
<button onClick={join}>join </button>

<input
type="text"
placeholder="enter recivername"
value={sender}
onChange={(e)=>setSender(e.target.value)}
/>
<input
type="text"
placeholder="enter msg"
value={msg}
onChange={(e)=>setMsg(e.target.value)}
/>

<button onClick={sendMsg}>send msg </button>

<p>{isConnected?"connected":"disconneted"}</p>

<p>status: {status}</p>


</div>)
}


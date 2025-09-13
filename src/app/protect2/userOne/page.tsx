'use client'
import { userStateStore } from "@/zustandStore"
import Link from "next/link"

export default  function UserOne() {
const  {ws,setWs,status,setStatus,userName,
setUserName,msg,setMsg,sender,setSender,isConnected,
setIsConnected
}=userStateStore()


//join socket
const joinws=()=>{
const socket=new WebSocket('ws://localhost:8080/')

socket.onopen=()=>{
setWs(socket)
socket.send(JSON.stringify({action:"JOIN",userName}))
setIsConnected(true)
}
socket.onmessage=(event)=>{
const parsedMsg=JSON.parse(event.data) as {type:string,msg:string}
if(parsedMsg.type==='JOIN'){
setStatus(parsedMsg.msg)
}else if(parsedMsg.type==='MSG'){
setStatus(parsedMsg.msg)
}
}
socket.onclose=()=>{
setIsConnected(false)
setWs(null)
}

}
 
//send msg
const sendMsg=()=>{
if(!ws) return 
if(ws.readyState===WebSocket.OPEN){
ws.send(JSON.stringify({action:"MSG",reciver:sender,userName,msg}))
}
}

return (<div>
<Link href={'/otp'}>
<button  className="bg-amber-400">go to VerifyMobile</button>
</Link>

<input 
type="text"
placeholder="enter your userName"
value={userName}
onChange={(e)=>setUserName(e.target.value)}
/>

<button onClick={joinws}>join </button>
<p>{isConnected?'connected':'disconnnected'}</p>

<input 
type="text"
placeholder="enter your reciver..."
value={sender}
onChange={(e)=>setSender(e.target.value)}
/>

<input 
type="text"
placeholder="enter your msg "
value={msg}
onChange={(e)=>setMsg(e.target.value)}
/>

<button onClick={sendMsg}>send msg</button>
<p>status:{status}</p>

</div>)
}
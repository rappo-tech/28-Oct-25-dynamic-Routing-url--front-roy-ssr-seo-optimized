'use client'

import { useRef, useState } from "react"

export default function VdoWebsoket() {

const ws =useRef<WebSocket|null>(null)
const[senderUser,setSenderUser]=useState<string>('')
const[msg,setMsg]=useState<string>('')
const groupId='TEST_GROUP'
const[status,setStatus]=useState<string>('')
const[wsOn,setWsOn]=useState<boolean>(false)
const[reciverUser,setReciverUser]=useState<string>('')

const handleSocketMsg=(event:MessageEvent)=>{
const  parsedMSG= JSON.parse(event.data) as {type:string,senderUser:string,msg:string}
if(parsedMSG.type==='JOIN'){
setStatus(parsedMSG.msg)
}else if(parsedMSG.type==='GROUP_CHAT'){
setStatus(parsedMSG.msg)
}else if(parsedMSG.type==='SINGLE_CHAT'){
setStatus(parsedMSG.msg)
}



}




//join
const  join=()=>{
ws.current= new WebSocket('ws://localHost:8080/')
ws.current.onopen=()=>{
ws.current?.send(JSON.stringify({
type:'JOIN', 
groupId, 
senderUser
}))
setWsOn(true)
}
ws.current.onmessage=(event)=>handleSocketMsg(event)
ws.current.onclose=()=>{
setWsOn(false)
ws.current=null
}
ws.current.onerror=()=>setStatus('ws is having an error ')

}

//send groupchat 
const groupChat=()=>{
if(ws.current){
ws.current?.send(JSON.stringify({
type:'GROUP_CHAT', 
groupId, 
senderUser,
msg 
}))
}
}


//send singlechat 
const sendSingleChat=()=>{
if(ws.current){
ws.current?.send(JSON.stringify({
type:'SINGLE_CHAT', 
groupId, 
senderUser,
reciverUser,
msg
}))
}
}

return (<div>

<p>{groupId}</p>
<input
type="text"
placeholder="enter sender name... "
value={senderUser}
onChange={(e)=>setSenderUser(e.target.value)}
></input>

<button onClick={join}>join ws </button>
<p>warning :- {status}</p>
<p>{wsOn?'ws connected':"ws disconnected "}</p>

<input
type="text"
placeholder="enter your msg ... "
value={msg}
onChange={(e)=>setMsg(e.target.value)}
></input>

<button onClick={groupChat}>send msg  to group</button>
<input
type="text"
placeholder="enter reviver user"
value={reciverUser}
onChange={(e)=>setReciverUser(e.target.value)}
></input>

<button onClick={sendSingleChat}>send single chat </button>




</div>)
}






















/*

types:-
webscoket=start()
rtcpeerconnection=createOffer(),handleOffer()
sdp=createOffer(),
iceCandidate
to 
from
clinentId
othersPeerId
roomId
peers: []

variables:-
pcRef
wsRef
mediaStream
localvdo 
remotevdo 
roomId
clinetId
othersPeerId
iswson
isvdon

start()
handleWebMsg()
createOffer()
createPeerConnection()
handleIcecandidate()
handleOffer()
handleAnswer()
end()



*/

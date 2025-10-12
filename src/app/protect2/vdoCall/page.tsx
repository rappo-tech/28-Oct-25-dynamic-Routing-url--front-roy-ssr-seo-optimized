'use client'

import { useState,useRef, useCallback } from "react"

interface  msgFromWebsocket{
type:string, 
peers?:[], 
clientId?:string, 
roomId?:string, 
to?:string,
sdp?:string, 
candidate?:string, 
from?:string,
othersPeerId?:string, 
} 

export  default function VdoCall() {
    
const [localSdp,setLocalSdp]=useState<string>('')
const [remoteSdp,setRemoteSdp]=useState<string>('')
const [localIceCandidate,setLocalIceCndidate]=useState<string>('')
const [remoteIceCandidate,setRemoteIceCandidate]=useState<string>('')
const clientId=useRef(Math.random())
const roomId='test_room'
const othersPeerId=useRef<string>('')
const wsRef=useRef<WebSocket|null>(null)
const [isWsOn,setIsWsOn]=useState<boolean>(false)
const [error,setError]=useState('')


const  end=()=>{
if(wsRef.current){
wsRef.current.close()
wsRef.current=null
}
setIsWsOn(false)
}



const createPeerConnection=useCallback(()=>{
const iceCandidate=Math.random()+`this is icecandidate `
wsRef.current?.send(JSON.stringify({
type:'ice-candidate', 
to:othersPeerId.current,
candidate:iceCandidate
}))
setLocalIceCndidate(iceCandidate)
},[])

const handleOffer=useCallback(async(from:string,sdp:string)=>{
await createPeerConnection()
othersPeerId.current=from
setRemoteSdp(sdp)
const answerSdp=Math.random()+' this is answer sdp '
wsRef.current?.send(JSON.stringify({
type:"answer",
to:from,
sdp:answerSdp
}))
setLocalSdp(answerSdp)
},[createPeerConnection])



const handleAnswer=(sdp:string)=>{
setRemoteSdp(sdp)
}


const handleIceCandidate=(candidate:string)=>{
setRemoteIceCandidate(candidate)
}



const createOffer=useCallback(async(targetId:string)=>{
await createPeerConnection()
othersPeerId.current=targetId
const createSdp= Math.random()+'this is offer sdp '
wsRef.current?.send(JSON.stringify({
type:"offer", 
to:targetId, 
sdp:createSdp
}))
setLocalSdp(createSdp)
},[createPeerConnection])


const handleMsg=useCallback(async(event:MessageEvent)=>{
const message :msgFromWebsocket  = JSON.parse(event.data)

switch (message.type) {

    case 'existing-peers':
if(message.peers && message.peers.length>0){
console.log('1. createoffer ran exisiting peer came ')
for(const  peerId of message.peers){
await createOffer(peerId)
}
}
        break;

    case 'new-peer':
console.log(`2. new peer is added  ${message.clientId}`)
    break;

    case 'offer':
if(message.from && message.sdp){
console.log(`3.handleOffer came ${message.from} , sdp; ${message.sdp} `)
await handleOffer(message.from,message.sdp)
}        
    break;

case 'answer':
console.log(`4.handleAnswer came ${message.from} , sdp ${message.sdp} `)
if(message.from && message.sdp){
await handleAnswer(message.sdp)
}
break;

case 'ice-candidate':
console.log('5.handleIce-candidate came ',message.candidate)
if(message.candidate){
await  handleIceCandidate(message.candidate)
}
break;
 case  'peer-left':
console.log(`this user has left the chat room ${message.clientId}`)
 break;

    default:
        break;
}


},[createOffer,handleOffer])

const start=()=>{
try{
wsRef.current= new WebSocket('ws://localhost:5001/')

wsRef.current.onerror=()=>{
console.log('err ws occured ')
}

wsRef.current.onclose=()=>{
setIsWsOn(false)
}

wsRef.current.onmessage=handleMsg

wsRef.current.onopen=()=>{
setIsWsOn(true)
wsRef.current?.send(JSON.stringify({
type:'join', 
clientId:clientId.current, 
roomId
}))
}

}catch{
setError('err try catch err ')
}
}



return (<div>

<button onClick={start}>start</button>
<p>{isWsOn?"ws connceted ":" ws disconnected "}</p>

<p>local sdp:- {localSdp}</p>
<p>remote sdp:-{remoteSdp}</p>
<p>local ip/iceCandidate:-{remoteIceCandidate}</p>
<p>remote ip/iceCandidate:-{localIceCandidate}</p>

<button onClick={end}>end call </button>

<p>warning:{error }</p>

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

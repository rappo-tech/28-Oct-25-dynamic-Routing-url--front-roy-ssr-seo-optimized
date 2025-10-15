//frontend for webRTC
'use client'

import { useState,useRef, useCallback } from "react"

export default function VdoCall() {

interface MsgFromSocketServer{
type?:string,
peers?:string[], 
clientId?:string,
roomId?:string,
to?:string, 
sdp?:RTCSessionDescriptionInit, 
candidate?:RTCIceCandidateInit,
from?:string, 
}    

const localVdo=useRef<HTMLVideoElement|null>(null)
const remoteVdo=useRef<HTMLVideoElement|null>(null)
const clientId=useRef(Math.random())
const RoomId='TEST_ROOM'
const vdoStream=useRef<MediaStream|null>(null)
const wsRef=useRef<WebSocket|null>(null)
const pcRef=useRef<RTCPeerConnection|null>(null)
const othersPeerId=useRef<string>('')
const [isWsOn,setIsWsOn]=useState<boolean>(false)
const [vdoOn,setIsVdoOn]=useState<boolean>(false)




const end=()=>{
if(pcRef.current){
pcRef.current.close()
pcRef.current=null
}

if(wsRef.current){
wsRef.current.close()
wsRef.current=null 
}

if(vdoStream.current){
vdoStream.current.getTracks().forEach((track)=>track.stop())
vdoStream.current=null
}
if(localVdo.current){
localVdo.current.srcObject=null
}
if(remoteVdo.current){
remoteVdo.current.srcObject=null
}
setIsVdoOn(false)
setIsWsOn(false)
}


const createPeerConnection=useCallback(()=>{
const pc=new RTCPeerConnection({iceServers:[{urls:'google stun '}]})
//send localvdo 
if(vdoStream.current){
vdoStream.current.getTracks().forEach((track)=>pc.addTrack(track,vdoStream.current!))
}
//recive remoteVdo 
pc.ontrack=(event)=>{
if(remoteVdo.current){
remoteVdo.current.srcObject=event.streams[0]
}
}
//send iceCandidate 
pc.onicecandidate=(event)=>{
wsRef.current?.send(JSON.stringify({
type:"ice-candidate", 
to:othersPeerId.current, 
candidate:event.candidate
}))
}
return pc

},[])

const createOffer=useCallback(async(targetId:string)=>{
if(!pcRef.current){
pcRef.current=createPeerConnection()
}
othersPeerId.current=targetId
const offerSdp=await pcRef.current.createOffer()
await pcRef.current.setLocalDescription(offerSdp)
wsRef.current?.send(JSON.stringify({
type:'offer', 
to:targetId,
sdp:offerSdp
}))


},[createPeerConnection])

const handleOffer=useCallback(async(from:string,sdp:RTCSessionDescriptionInit)=>{
if(!pcRef.current){
pcRef.current=createPeerConnection()
}
othersPeerId.current=from 
await pcRef.current.setRemoteDescription(sdp)
const answerSdp=await pcRef.current.createAnswer()
await pcRef.current.setLocalDescription(answerSdp)
wsRef.current?.send(JSON.stringify({
type:"answer",
to:from, 
sdp:answerSdp
}))


},[createPeerConnection])

const handleAnswer=async(sdp:RTCSessionDescriptionInit)=>{
if(pcRef.current){
await pcRef.current.setRemoteDescription(sdp)
}
}

const handleIceCandidate=async(candidate:RTCIceCandidateInit)=>{
if(pcRef.current){
await pcRef.current.addIceCandidate(candidate)
}
}

const handleMsg=useCallback(async(event:MessageEvent)=>{
const parsedMsg :MsgFromSocketServer =JSON.parse(event.data)
switch (parsedMsg.type) {

    case 'existing-peers':
if(parsedMsg.peers && parsedMsg.peers.length>0){
for(const peerId of parsedMsg.peers){
await createOffer(peerId)
}
}     
        break;
case 'new-peer':
console.log('new peer added ')
break;

case 'offer':
if(parsedMsg.from && parsedMsg.sdp){
await handleOffer(parsedMsg.from,parsedMsg.sdp)
}
break;

case 'answer':
if(parsedMsg.from && parsedMsg.sdp){
await handleAnswer(parsedMsg.sdp)
}
break;

case 'ice-candidate': 
if(parsedMsg.candidate){
await handleIceCandidate(parsedMsg.candidate)
}
break;

case 'peer-left':
console.log(`this user has left ${parsedMsg.clientId}`)
break;

    default:
        break;
}



},[createOffer,handleOffer])


const start=async()=>{
const camera=await navigator.mediaDevices.getUserMedia({video:true,audio:true})
vdoStream.current=camera
if(localVdo.current){
localVdo.current.srcObject=camera
}
wsRef.current= new WebSocket('backend url')
wsRef.current.onopen=()=>{
setIsWsOn(true)
wsRef.current?.send(JSON.stringify({type:'join',clientId:clientId.current,RoomId}))
}
wsRef.current.onmessage=handleMsg
wsRef.current.onerror=()=>console.log('error')
wsRef.current.onclose=()=>{
setIsVdoOn(false)
setIsWsOn(false)
}
setIsVdoOn(true)


}

return (<div>

<button onClick={start}>start </button>
<p>{isWsOn?"websocket connected ":'websocket disconncted '}</p>


<p>local video</p>
<video
ref={localVdo}
className="w-48 h-36 border-4"
playsInline
muted
autoPlay
controls
></video>


<p>remote video</p>
<video
ref={remoteVdo}
className="w-48 h-36 border-4"
playsInline
muted={false}
autoPlay
controls
></video>


<button onClick={end}>end </button>
<p>{vdoOn?"vdo on":"vdo off"}</p>



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

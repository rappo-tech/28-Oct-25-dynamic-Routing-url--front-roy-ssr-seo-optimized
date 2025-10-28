'use client'
import { useRef } from "react";

export default function VdoCall2() {
const actualVdo= useRef<HTMLVideoElement|null>(null)
const vdoStream=useRef<MediaStream|null>(null)


//start
const start=async()=>{
const camera=await navigator.mediaDevices.getUserMedia({video:true,audio:true})
vdoStream.current=camera
if(actualVdo.current){
actualVdo.current.srcObject=camera
}
}

//end
const  end=()=>{
if(vdoStream.current){
vdoStream.current.getTracks().forEach((x)=>x.stop())
vdoStream.current=null
}
if(actualVdo.current){
actualVdo.current=null
}
}


return (<div>

<button onClick={start}>strat vdo </button>

<video
ref={actualVdo}
className="w-48 h-36 border-4"
controls
autoPlay
muted
playsInline
></video>


<button onClick={end}>end vdo </button>


</div>)
}
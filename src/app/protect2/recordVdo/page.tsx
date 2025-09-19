'use client'

import { useRef, useState } from "react"

 export default function  RecordVdo() {
const vdoStream=useRef<MediaStream|null>(null)
const actualVdo=useRef<HTMLVideoElement|null>(null)    
const htmlRecorder=useRef<MediaRecorder|null>(null)
const vdoHolder=useRef<Blob[]>([])
const [isRecording,setIsRecording]=useState<boolean>(false)
const [vdoUrl,setVdoUrl]=useState<string>('')

//startRedording====blob==url
const  start=async()=>{
const camera=await navigator.mediaDevices.getUserMedia({video:true,audio:true})
vdoStream.current=camera
if(actualVdo.current){
actualVdo.current.srcObject=camera
}
const jsRecorder= new MediaRecorder(camera)
htmlRecorder.current=jsRecorder

jsRecorder.ondataavailable=(e)=>{
if(e.data.size>0){
vdoHolder.current.push(e.data)
}
}

jsRecorder.onstop=()=>{
const blob= new Blob(vdoHolder.current,{type: 'video/webm'})
setVdoUrl(URL.createObjectURL(blob))
vdoHolder.current=[]
}
jsRecorder.start()
setIsRecording(true)
}

//stopRecording
const stopRecording=()=>{
if(vdoStream.current){
vdoStream.current.getTracks().forEach((track)=>track.stop())
}
setIsRecording(false)
}

//download it into the laptop 


return (<div>

<button onClick={start}>start </button>
<p>{isRecording?'recodring start':"recording stop"}</p>
<video
ref={actualVdo}
autoPlay
playsInline
muted
className="w-48 h-36 border-4"
></video>

<button onClick={stopRecording} className="bg-red-700">stop </button>

<p className="bg-teal-300">{vdoUrl}</p>

</div>)
 }

 //19Sept2025-recordVdo-generate-blob-url
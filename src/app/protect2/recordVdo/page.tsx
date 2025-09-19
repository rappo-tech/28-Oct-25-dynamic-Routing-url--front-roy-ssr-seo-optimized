'use client'

import { useRef, useState } from "react"
import axios from "axios"
import { userStateStore } from "@/zustandStore"

export default function Record() {
const actualVdo=useRef<HTMLVideoElement|null>(null)
const vdoStream=useRef<MediaStream|null>(null)
const htmlRecorder=useRef<MediaRecorder|null>(null)
const vdoHolder=useRef<Blob[]>([])
const[vdoUrl,setVdoUrl]=useState<string>('')
const[isRecording,setIsRecording]=useState<boolean>(false)
const {status,setStatus}=userStateStore()

//start
const start=async()=>{
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
jsRecorder.onstop=async()=>{
const blob= new Blob(vdoHolder.current,{type:'video/webm'})
const  file= new FormData()
file.append('file',blob)
const response=await axios.post('/protect/uploadImg',file,{
headers:{'Content-Type':"multipart/form-data"}
})
if(response.status===201){
setStatus(response.data.url)
}
setVdoUrl(URL.createObjectURL(blob))
}
jsRecorder.start()
setIsRecording(true)
}

//stop 
const stop=()=>{
if(vdoStream.current){
vdoStream.current.getTracks().forEach((track)=>track.stop())
}
setIsRecording(false)
}

//save in local 
const download=()=>{
const a = document.createElement('a')
a.href=vdoUrl
a.download=`my-vdo ${Date.now()}.webm`
a.click()
}

return (<div>

<button onClick={start}>start</button>

<video
ref={actualVdo}
className="w-48 h-36 border-4"
playsInline
autoPlay 
muted
></video>

<button onClick={stop}>stop </button>


<p>{isRecording?'yes':"no "}</p>
<p className="bg-teal-400">{vdoUrl}</p>

<p>{status}</p>

<button onClick={download}>save in laptop </button>

</div>)
}

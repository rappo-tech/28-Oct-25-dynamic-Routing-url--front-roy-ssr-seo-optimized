'use client'
import { userStateStore } from "@/zustandStore"
//camer vdo, then websocket 
import { useRef, useState,useEffect } from "react"
import axios from "axios"

export default function  UserOne() {

const actualVdo= useRef<HTMLVideoElement|null>(null)
const vdoStream= useRef<MediaStream|null>(null)
const htmlVdoRecorder=useRef<MediaRecorder|null>(null)
const vdoHolder=useRef<Blob[]>([])
const [vdoUrl,setVdoUrl]=useState<string>('')
const [isOn,setIsOn]=useState<boolean>(false)
const {status,setStatus}=userStateStore()
const [cloudUrl,setCloudUrl]=useState<string>('')
const cloudVdo=useRef<HTMLVideoElement|null>(null)


  useEffect(() => {
    if (cloudVdo.current && cloudUrl) {
      cloudVdo.current.src = cloudUrl;
      cloudVdo.current.play().catch((err) => console.log("Autoplay failed:", err));
    }
  }, [cloudUrl]);





//start recording 
const startRecording=async()=>{
const camera=await navigator.mediaDevices.getUserMedia({video:true,audio:true})
vdoStream.current=camera
 if(actualVdo.current){
actualVdo.current.srcObject=camera
 }
const jsRecorder= new MediaRecorder(camera)
htmlVdoRecorder.current=jsRecorder
vdoHolder.current=[]
jsRecorder.ondataavailable=(e)=>{
if(e.data.size>0){
vdoHolder.current.push(e.data)
}
}
jsRecorder.onstop=async()=>{
const blob= new Blob(vdoHolder.current,{type:'video/webm'})
if(blob){
const url= URL.createObjectURL(blob)
setVdoUrl(url)
const file=new FormData()
file.append('file',blob)
const response=await axios.post('/protect/uploadImg',file,{
headers:{'Content-Type':"multipart/form-data"}
})
if(response.status===201){
setCloudUrl(response.data.url)
if(cloudVdo.current){
cloudVdo.current.src=response.data.url
cloudVdo.current.play()
}
setStatus(response.data.publicId)
}
}
}
jsRecorder.start()
setIsOn(true)
}
//stop recording 
const stopRecording=()=>{
if(vdoStream.current){
vdoStream.current.getTracks().forEach((x)=>x.stop())
}
setIsOn(false)
}

return (<div>


<button onClick={startRecording}>start vdo </button>

<video
ref={actualVdo}
className="w-48 h-36 border-4"
playsInline 
autoPlay
muted
></video>

<button onClick={stopRecording}>stop </button>

<p>{isOn?'vdo on':"vdo off"}</p>
<p className="bg-teal-500">vdoUrl:{vdoUrl}</p>




<p>warning: {status}</p>
<p className="bg-amber-400">vdo url from cloudinary:{cloudUrl}</p>
{cloudUrl && 
<video
ref={cloudVdo}
className="w-60 h-48 border-4 rounded-4xl"
playsInline
autoPlay
muted
controls
></video>
}


{cloudUrl && 
<video
src={cloudUrl}
className="w-60 h-48 border-4 rounded-4xl"
playsInline
autoPlay
muted
controls
></video>
}

</div>)
}
//21Sept2025-recordVdo-upload2Clodinary-getUrlFromCloudiary-playVdo


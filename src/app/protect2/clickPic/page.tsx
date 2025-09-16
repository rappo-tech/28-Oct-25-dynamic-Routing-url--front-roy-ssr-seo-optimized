'use client'

import { useRef, useState } from "react"
import Image from "next/image"

export default function Click() {
const vdoStreaming=useRef<MediaStream|null>(null)
const actualVdo=useRef<HTMLVideoElement|null>(null)
const imageCanvas=useRef<HTMLCanvasElement|null>(null)
const [imgUrl,setImgUrl]=useState<string>('')


//strat vdo streaming 
const startVdo=async()=>{
const camera=await navigator.mediaDevices.getUserMedia({video:true,audio:true})
vdoStreaming.current=camera
if(actualVdo.current){
actualVdo.current.srcObject=camera
}
}

//click img 
const clickImg=()=>{
if(!imageCanvas.current ||  !actualVdo.current) return 
const canvas= imageCanvas.current.getContext('2d')!
imageCanvas.current.height=actualVdo.current.videoHeight
imageCanvas.current.width=actualVdo.current.videoWidth
canvas.drawImage(actualVdo.current,0,0)
imageCanvas.current.toBlob((blob)=>{
if(blob){
const url=URL.createObjectURL(blob)
setImgUrl(url)
}
})



//create canvas 
//set canvas width and height  
//draw  the img of vdo.current on canvas 
//convert that drawing img to blob and blob into url
}




//stop vdo streaming 
const stopStreaming=()=>{
if(vdoStreaming.current){
vdoStreaming.current.getTracks().forEach((track)=>track.stop())
}
}

const download=()=>{
const a = document.createElement('a')
a.href=imgUrl
a.download=`my-img ${Date.now}.png`
a.click()
}


return (<div >

<canvas ref={imageCanvas}  style={{display:'none'}}></canvas>
<button onClick={startVdo}>start vdo </button>

<video
ref={actualVdo}
className='h-36 w-48 border-4'
autoPlay
playsInline
muted
></video>

<button onClick={clickImg}>click img </button>



<button onClick={stopStreaming}>stop streaming </button>


{imgUrl &&
<Image
alt="any"
width={100}
height={100}
src={imgUrl}
></Image>
}

<p className="bg-teal-400" onClick={download}>{imgUrl}</p>


</div>)
}
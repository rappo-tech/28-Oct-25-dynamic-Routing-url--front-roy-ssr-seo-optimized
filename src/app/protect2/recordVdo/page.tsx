/*
'use client'

import { useState,useRef } from "react"

//stream vdo,save into blob array,make a url out of it,click camera img pic
export  default function RecordVdo() {
const [isVdoOn,setIsVdoOn]=useState<boolean>(false)    
const vdoStream=useRef<MediaStream|null>(null)
const [vdoUrl,setVdoUrl]=useState<string>('')
const localVdo=useRef<HTMLVideoElement|null>(null)
const vdoHolder=useRef<Blob[]>([])
const htmlRecorder=useRef<MediaRecorder|null>(null)



//start streaming 
const start=async()=>{
const camera=await  navigator.mediaDevices.getUserMedia({video:true,audio:true})
vdoStream.current=camera
if(localVdo.current){
localVdo.current.srcObject=camera
}    
const jsRecorder= new MediaRecorder(camera)
htmlRecorder.current=jsRecorder
const jsVdoHolder= new Blob(vdoHolder.current,{type:"video"})




}

//stop streaming


}
*/
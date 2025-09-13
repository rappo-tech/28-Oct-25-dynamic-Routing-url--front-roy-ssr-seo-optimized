'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react"

export default function Vdo() {

const actualVdoStream=useRef<HTMLVideoElement|null>(null)
const fileInput=useRef<HTMLInputElement|null>(null)
const[vdoUrl,setVdoUrl]=useState<string>('')
const[totalDuration,setTotalDuration]=useState<number>(0)
const[currentDuration,setCurrentDuration]=useState<number>(0)
const[isVdoPlaying,setIsVdoPlaying]=useState<boolean>(false)


//clear if any  vdourl is avlable there
useEffect(()=> {
return ()=>{
if(vdoUrl){
URL.revokeObjectURL(vdoUrl)
}
}
},[vdoUrl])

// fill the inputTheForm of  vdo file  
const handleInputForm=(e:ChangeEvent<HTMLInputElement>)=>{
const fileName=e.target.files?.[0]
if(fileName && actualVdoStream.current){
const  url=URL.createObjectURL(fileName)
setVdoUrl(url)
actualVdoStream.current.src=url
actualVdoStream.current.play()
setIsVdoPlaying(true)
}
}

//seleectTheVdofile and play 
const selectVdo=()=>{
fileInput.current?.click()
}
//set the time to totalDuration and curent duratiom
const changeTime=()=>{
if(actualVdoStream.current){
setTotalDuration(actualVdoStream.current.duration)
setCurrentDuration(actualVdoStream.current.currentTime)
}
}

//drag the vdo timeLine
const  drag=(e:ChangeEvent<HTMLInputElement>)=>{
if(actualVdoStream.current){
actualVdoStream.current.currentTime=Number(e.target.value)
setCurrentDuration(Number(e.target.value))
}
}

//play and pause
const stop=()=>{
if(!actualVdoStream.current) return 
if(isVdoPlaying){
actualVdoStream.current.pause()
}else {
actualVdoStream.current.play()
}
setIsVdoPlaying(!isVdoPlaying)
}

return (<div>


<input
type="file"
accept="video/*"
ref={fileInput}
placeholder="select vdo file"
onChange={handleInputForm}
/>
<button onClick={selectVdo}> select button </button>


<div >
<video
ref={actualVdoStream}
onTimeUpdate={changeTime}
className="h-36 w-48 border-2 rounded-3xl"
autoPlay
muted
playsInline
></video>

<input
type="range"
max={100|totalDuration}
min={0}
onChange={drag}
value={currentDuration}
/>
<p>{currentDuration}/{totalDuration}secs</p>
<button  className='bg-red-700'   onClick={stop}>stop </button>
</div>




</div>)
}
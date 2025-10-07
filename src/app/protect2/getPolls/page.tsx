'use client'

import { useState } from "react"
import { store } from "@/zustandStore"
import axios from "axios"

export default function GetPolls() {

interface options{
optionsName:string, 
like:number
}
interface  pollAll{
question:string, 
options:options[]
}


const[all,setAll]=useState<pollAll[]>([])
const {status,setStatus,}=store()

//getPolls
const getPolls=async()=>{
const response=await axios.get('/protect/getPolls')
if(response.status===201){
setAll(response.data)
}else{
setStatus('err while fetching polls ')
}
}

//likeOPtions
const  likeOptions=async (optionsName:string)=>{
try{
const resposne=await axios.post('/protect/likeOpn',{optionsName},{
headers:{'Content-Type':'application/json'}
})
if(resposne.status===201){
setStatus(resposne.data)
getPolls()
}
}catch{
setStatus('error while liking the options ')
}
}

return (<div>

<button onClick={getPolls}>getpoll</button>
<div>{
all.map((element,index)=>{
return <div key={index}>
<p>{element.question}</p>
<div>{
element.options.map((element2,index2)=>{
return <div key={index2}>
<p>{element2.optionsName}</p>
<button onClick={()=>likeOptions(element2.optionsName)}>{element2.like}</button>
</div>
})
}</div>
</div>
})
    }</div>



<p>warning: {status}</p>




</div>)
}
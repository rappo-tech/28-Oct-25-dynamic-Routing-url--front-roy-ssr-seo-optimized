'use client'
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


interface  ArrType{
post:string,
imgUrl:string
}


export  default  function  VeiwAllPosts({params}:{params : Promise<{userName:string}>}) {
const {userName}= React.use<{userName:string}>(params)
const [arr,setArr]=useState<ArrType[]>([])    
const [status,setStatus]=useState<string>('')
const router=useRouter()



const  getAllPosts=async()=>{
try{
const response=await axios.post('/backend/getAllPosts',{userName},{headers:{'Content-Type':"application/json"}})
if(response.status===201){
setArr(response.data)
}
}catch{
setStatus('')
}
}


//to view users allPOsts with imgUrl
const  handleClick2=(postName:string)=>{
router.push(`/front/veiwAllPosts/${userName}/post/${postName}`)
}

/*
const handleClick3=(postName:string)=>{
router.push(`/front/${userName}/post/${postName}`)
}
*/
//[userName]/post/[postName]/page.tsx/page.tsx




return (<div>

<p>{userName}</p>

<button onClick={getAllPosts}>get all POst</button>


<div>{
arr.map((elemnt,index)=>{
return <div key={index}>
<button className="bg-blue-800" onClick={()=>handleClick2(elemnt.post)}  >{elemnt.post}</button>
<p className="bg-sky-400">{elemnt.imgUrl}</p>
</div>
})
    }</div>

<p>{status}</p>


</div>)
}
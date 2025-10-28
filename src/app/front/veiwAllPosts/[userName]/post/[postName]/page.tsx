'use client'
import React, { useState } from "react"
import axios from "axios"

export default function PostName({params}:{params:Promise<{  userName: string,postName:string  }>}) {
const {userName,postName}= React.use<{userName:string,postName:string}>(params)
const[status,setStatus]=useState<string>('')
const[id,setId ]=useState<string>('')
const[time,setTime]=useState<string>('')
const[imgUrl,setImgUrl]=useState<string>('')

const getIdNTimeOfPost=async()=>{
try{
const response=await axios.post('/backend/getPostDetails',{userName,postName},{headers:{'Content-Type':"application/json"}})
if(response.status===201){
setId(response.data.id)
setTime(response.data.time)
setImgUrl(response.data.imgUrl)
}
}catch{
setStatus('try catch err')
}
}

return (<div>

<button onClick={getIdNTimeOfPost} className="bg-yellow-600">getTime </button>


<p className="bg-blue-500">{postName}</p>
<p className="bg-blue-500">{userName}</p>
<p className="bg-blue-500">{imgUrl}</p>
<p className="bg-blue-500">{id}</p>
<p className="bg-amber-500">{time}</p>




<p>warning :{status}</p>
</div>)
}
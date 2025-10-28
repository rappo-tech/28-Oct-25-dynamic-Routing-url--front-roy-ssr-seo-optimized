'use client'

import axios from "axios"
import { useState } from "react"
import React from "react"


export default  function CreatePost({params}:{params:Promise<{  userName: string  }>}) {
  const[imgUrl,setImgUrl]=useState<string>('')
  const[post,setPost]=useState<string>('')
  const[status,setStatus]=useState<string>('')
  const {userName}= React.use<{  userName: string  }>(params)
 
 

  

  const createImg=async()=>{
  try{
const response=await axios.post('/backend/createPost',{userName,post,imgUrl},{headers:{'Content-Type':"application/json"}})
if(response.status===201){
setStatus(response.data)
}
  }catch{
setStatus('try catch error')
  }
  }

return (<div>

<p>{userName}</p>

<input
type="text"
placeholder="enter post"
value={post}
onChange={(e)=>setPost(e.target.value)}
></input>



<input
type="text"
placeholder="enter img url "
value={imgUrl}
onChange={(e)=>setImgUrl(e.target.value)}
></input>

<button onClick={createImg}>create Post </button>

<p>warning :-{status}</p>




</div>)
}

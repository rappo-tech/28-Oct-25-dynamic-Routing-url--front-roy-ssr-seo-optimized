'use client'

import { useState } from "react"
import axios from "axios"

export default function CreateUser() {
const[userName,setUserName]=useState<string>('')
const[status,setStatus]=useState<string>('')

//createUser
const createUser= async()=>{
try{
const response= await axios.post('/backend/createUser',{userName},{headers:{'Content-Type':"application-json"}})
if(response.status===201){
setStatus(response.data)
}
}catch{
setStatus('try catch error ')
}
}

return (<div>

<input
type="text"
placeholder="enter userName ... "
value={userName}
onChange={(e)=>setUserName(e.target.value)}
></input>

<button onClick={createUser}>createUser</button>
<p>status:- {status}</p>


</div>)
}
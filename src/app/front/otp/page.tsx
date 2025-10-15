'use client'

import { useState } from "react"
import axios from "axios"

export default function Otp() {
const[mobile,setMobile]=useState<number>(0) 
const[status,setStatus]=useState<string>('')

//sednMobile
const sednMobile=async()=>{
try{
const resposne=await axios.post('/protect/saveMobile',{mobile},{headers:{'Content-Type':"application/json"}})
if(resposne.status===201){
setStatus(resposne.data)
}
}catch{
setStatus('try catch err')
}
}

return (<div>

<input
type="number"
placeholder="enter your mobile no "
value={mobile}
onChange={(e)=>setMobile(Number(e.target.value))} 
/>

<button onClick={sednMobile}> sedn mobile </button>



<p>warning :{status}</p>

</div>)
}
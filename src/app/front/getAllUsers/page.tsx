'use client'
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


interface AllPostType{
post:string
}
interface  ArrType{
userName:string, 
allPosts:AllPostType[]
}

export  default  function  GetAllUsers() {
const [arr,setArr]=useState<ArrType[]>([])
const [status,setStatus]=useState<string>('')
const [userName,setUserName]=useState<string>('')
const router=useRouter()

//getAllUsers
const getAllUsers=async()=>{
  try{
const response=await axios.get('/backend/getAllUsers')
if(response.status===201){
setArr(response.data)
}
  }catch{
  setStatus('try catch error ')
  }
}

//sendUserName+route to create postPage
const  handleClick=()=>{
router.push(`/front/createPost/${userName}`)
}

//to view users allPOsts with imgUrl
const  handleClick2=(userName:string)=>{
router.push(`/front/${userName}`)
}



return(<div>
<p>{userName}</p>



<button onClick={getAllUsers} className="bg-red-600">get users </button>


<div>{
arr.map((elemnt,index)=>{
return <div key={index}>
<button className="bg-blue-500" onClick={()=>setUserName(elemnt.userName)}>{elemnt.userName}</button>
<button className="bg-teal-600" onClick={()=>handleClick2(elemnt.userName)}>veiw all his post</button>
<button onClick={handleClick} className="bg-green-600">creeate Post </button>
<div>{
elemnt.allPosts.map((elemnt2,index2)=>{
return <div key={index2}>
<button className="bg-yellow-600">{elemnt2.post}</button>
</div>
})  
}</div>
</div>
})
  }</div>

<p>warning :{status}</p>

</div>)
}


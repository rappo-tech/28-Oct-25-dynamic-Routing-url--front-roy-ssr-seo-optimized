'use client'

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"  // ✅ useRouter for navigation

interface ArrType {
  userName: string,
  createdAt:number, 
  id:string
}
export default function GETUSER() {
  const [arr, setArr] = useState<ArrType[]>([])
  const [error, setError] = useState<string>('')
  const [active, setActive] = useState<string>('')
  const router = useRouter() // ✅
  const [userName,setUserName]=useState<string>('')
  const baseUrl = 'http://localhost:3000/getUsers/'

  // Fetch all users
  const getArr = async () => {
    try {
      const response = await axios.get('/protect/getUser')
      if (response.status === 201) {
          console.log('📡 Data source:', response.data.source); 
        setArr(response.data.data)

      }
    } catch {
      setError('Error while getting the array')
    }
  }

// When clicking a user name
  const handleUserClick = (name: string) => {
    setActive(name)
    router.push(`${baseUrl}`+`${name}`)// ✅ dynamic URL change
}

 const  claerArr= async () => {
const response= await axios.post('/protect/deleteCache')
if(response.status===201){
  alert('Cache deleted!')
  setArr([])
}
}

const emptyArr=()=>{
setArr([])
}
const createUser=async()=>{
try{
const response=await axios.post('/protect/createUser',{userName},{headers:{'Content-Type':"application/json"}})
if(response.status===201){
setError(response.data)
getArr()
}
}catch{
setError('try catch error')
}
}



  return (
    <div>

<input
type="text"
placeholder="enter your userName"
value={userName}
onChange={(e)=>setUserName(e.target.value)}
></input>
<button onClick={createUser} className="bg-teal-500 hover:bg-teal-400">createUser</button>






      <button onClick={claerArr} className="bg-purple-600 hover:bg-purple-500">clear</button>
      
      <button onClick={emptyArr} className="bg-red-600 hover:bg-red-500">emptty it </button>
      <button onClick={getArr}>Get Users</button>
      <p>active:{active}</p>

      <div>
        {arr.map((element, index) => (
          <div key={index}>
            <button
              className="bg-amber-700 hover:bg-amber-600"
              onClick={() => handleUserClick(element.userName)}
            >{element.userName}</button>
     <p>userId:{element.id}</p>
     <p>creating Time:-{element.createdAt}</p>
           
          </div>
        ))}
      </div>

      <p>Warning: {error}</p>
    </div>
  )
}

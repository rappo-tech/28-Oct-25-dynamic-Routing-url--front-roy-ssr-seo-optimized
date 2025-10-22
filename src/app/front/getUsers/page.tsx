'use client'

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"  // ✅ useRouter for navigation

interface ArrType {
  name: string,
  pin: number,
  city: string,
  msg: string
}

export default function GETUSER() {
  const [arr, setArr] = useState<ArrType[]>([])
  const [error, setError] = useState<string>('')
  const [active, setActive] = useState<string>('')
  const router = useRouter() // ✅

  // Fetch all users
  const getArr = async () => {
    try {
      const response = await axios.post('/protect/getUser', { name: '' }, { headers: { Authorization: 'application/json' } })
      if (response.status === 201) {
        setArr(response.data)
      }
    } catch {
      setError('Error while getting the array')
    }
  }

  // When clicking a user name
  const handleUserClick = (name: string) => {
    setActive(name)
    router.push(`/front/getUsers/${name}`) // ✅ dynamic URL change
  }

  return (
    <div>
      <button onClick={getArr}>Get Users</button>
      <p>active:{active}</p>

      <div>
        {arr.map((element, index) => (
          <div key={index}>
            <button
              className="bg-amber-700 hover:bg-amber-600"
              onClick={() => handleUserClick(element.name)}
            >
              {element.name}
            </button>
          </div>
        ))}
      </div>

      <p>Warning: {error}</p>
    </div>
  )
}

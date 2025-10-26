'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

interface ArrType {
  name: string,
  pin: number,
  city: string,
  msg: string
}

export default function UserDetail() {
  const params = useParams()
  const userName = params.userName as string

  const [user, setUser] = useState<ArrType[]>([])

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await axios.post('/protect/getUser', { name: userName }, { headers: { "Content-Type": 'application/json' } })
        if (response.status === 201) {
          setUser(response.data)
        }
      } catch {
        console.log('Error while getting user detail')
      }
    }
    getUserDetail()
  }, [userName])

  return (
    <div>
      <h2>Detail about user: {userName}</h2>
      {user.map((u, index) => (
        <div key={index}>
          <p>Name: {u.name}</p>
          <p>City: {u.city}</p>
          <p>Pin: {u.pin}</p>
        </div>
      ))}
    </div>
  )
}

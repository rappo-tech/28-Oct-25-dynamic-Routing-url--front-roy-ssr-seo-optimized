'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [userName, setUserName] = useState('')
  const queryClient = useQueryClient()

  // Mutation — sends updated username to backend
  const updateUserMutation = useMutation({
    mutationFn: async (userName: string) => {
      console.log('Sending username to backend...')
      const res = await axios.post('/protect/createUser', {userName})
      return res.data
    },
    onSuccess: () => {
      console.log('✅ Backend updated, invalidating old cached data...')
      queryClient.invalidateQueries({ queryKey: ['query1'] })
    },
  })

  const handleSubmit = () => {
    if (!userName.trim()) return alert('Enter a username!')
    updateUserMutation.mutate(userName)
   alert('cache Invalidated ')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Update User Profile</h2>

      <input
        type="text"
        placeholder="Enter new username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ padding: '6px', marginRight: '10px' }}
      />
      <button onClick={handleSubmit}>Update</button>

      {updateUserMutation.isPending && <p>Updating...</p>}
      {updateUserMutation.isSuccess && <p>✅ Username updated!</p>}
      {updateUserMutation.isError && (
        <p style={{ color: 'red' }}>❌ Failed to update</p>
      )}


<Link href={'/front/getUsers'}>
<button className='bg-amber-600 hover:bg-amber-500'>see usersArray </button>
</Link>
    </div>
  )
}

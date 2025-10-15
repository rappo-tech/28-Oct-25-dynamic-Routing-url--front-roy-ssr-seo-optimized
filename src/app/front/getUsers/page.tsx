'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'

export default function DiscussPage() {
  // useQuery will automatically cache the data and retry if it fails
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['query1'], // cache key name
    queryFn: async () => {
      console.log('Frontend: fetching data from backend...')
      const res = await axios.get('/protect/getUser')
      return res.data
    },
    retry: 3, // default 3 retries if request fails
    staleTime: 60 * 1000, // cache valid for 1 min
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {String(error)}</p>

  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Users List (Cached with React Query)</h2>
      <button className='bg-green-600 hover:bg-green-500' onClick={() => refetch()}>♻️ Refetch from server</button>

      <ul>
        {data.map((user: string, index: number) => (
          <li key={index}>{user}</li>
        ))}
      </ul>

<Link href={'/front/createUsers'}>
<button className='bg-amber-600 hover:bg-amber-500'>create user </button>
</Link>

    </div>
  )
}

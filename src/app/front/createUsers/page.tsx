'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CreateUniqueUrl() {
  const [channelName, setChannelName] = useState('')
  const [url, setUrl] = useState('')

  const baseUrl = 'http://localhost:3000/promo/'

  const generateUrl = () => {
    try {
      const genUrl = `${baseUrl}${channelName}`
      setUrl(genUrl)
      //save  that url with  influncer+channel Name+genrated url
    } catch {
      setUrl('err')
    }
  }

  return (
    <div className="p-5">
      <input
        type="text"
        placeholder="enter your channel name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        className="border p-2"
      />
      <button
        onClick={generateUrl}
        className="ml-2 bg-green-700 hover:bg-green-600 px-3 py-1 text-white rounded"
      >
        Generate
      </button>

      {url && (
        <>
          <p className="mt-4 font-semibold">Your unique URL:</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {url}
          </a>
        </>
      )}

<Link href={'/front/getUsers'}>
<button className='bg-red-600'>getUsers </button>
</Link>

    </div>
  )
}

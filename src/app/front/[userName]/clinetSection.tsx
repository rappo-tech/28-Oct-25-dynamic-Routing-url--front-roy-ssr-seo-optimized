'use client'
import { useRouter } from "next/navigation"

interface ArrType {
  post: string,
  imgUrl: string
}

export default function ClientSection({userName, posts}: {userName: string, posts: ArrType[]}) {
  const router = useRouter()//send to the other element sepcific page 
  
  return (
    <div>
      <h1>{userName} Posts</h1>
      
      {posts.map((element, index) => (
        <div key={index}>
          <button 
            className="bg-blue-800" 
            onClick={() => router.push(`/front/${userName}/post/${element.post}`)}
          >
            {element.post}
          </button>
          <p className="bg-sky-400">{element.imgUrl}</p>
        </div>
      ))}
    </div>
  )
}
'use client'

interface Props {
  userName: string,
  postName: string,
  id: string,
  time: string,
  imgUrl: string
}

export default function ClientSection({userName, postName, id, time, imgUrl}: Props) {
  
  return (
    <div>
      <p className="bg-blue-500">Post: {postName}</p>
      <p className="bg-blue-500">User: {userName}</p>
      <p className="bg-blue-500">Image: {imgUrl}</p>
      <p className="bg-blue-500">ID: {id}</p>
      <p className="bg-amber-500">Time: {time}</p>
    </div>
  )
}
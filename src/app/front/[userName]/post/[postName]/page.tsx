import ClientSection from './clientSection'

interface PostDetails {
  id: string,
  time: string,
  imgUrl: string
}

export default async function PostPage({params}: {params: Promise<{userName: string, postName: string}>}) {
  const {userName, postName} = await params
  
  const response = await fetch(`http://localhost:3000/backend/getPostDetails`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({userName, postName}),
    cache: 'no-store'
  })
  
  const data: PostDetails = await response.json()
  
  return <ClientSection 
    userName={userName} 
    postName={postName} 
    id={data.id}
    time={data.time}
    imgUrl={data.imgUrl}
  />
}
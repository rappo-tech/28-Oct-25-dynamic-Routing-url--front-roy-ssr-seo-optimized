import ClientSection from "./clinetSection"

interface ArrType {
  post: string,
  imgUrl: string
}

export default async function UserPostsPage({params}: {params: Promise<{userName: string}>}) {
  const {userName} = await params
  
  const response = await fetch(`http://localhost:3000/backend/getAllPosts`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({userName}),
    cache: 'no-store'
  })
  
  const posts: ArrType[] = await response.json()
  
  return <ClientSection userName={userName} posts={posts} />
}
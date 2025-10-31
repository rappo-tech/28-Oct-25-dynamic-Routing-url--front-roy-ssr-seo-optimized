import ClientSection from "./ClientSection"
import { otherGuyPostType } from "./ClientSection"

export default async function DataFetch({params}:{params:Promise<{userName:string}>}) {
const {userName}=await params
const response= await fetch(`http://localhost:3000/backend/getAllPosts`,{
method:"POST", 
headers:{'content-Type':"application/json"}, 
body:JSON.stringify({userName}), 
cache:'no-cache'
})
const otherGuyPost :otherGuyPostType[]= await response.json()
return <ClientSection userName={userName} otherGuyPost={otherGuyPost} />
}






/* 
import ClientSection from "./ClientSection"
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
  
  const othersPosts: ArrType[] = await response.json()
  
  return <ClientSection userName={userName} otherPosts={othersPosts} />
}
  */
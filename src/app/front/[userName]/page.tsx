import { AllPostsType } from "./UIallPosts"
import UIAllPosts from "./UIallPosts"
export default async function DataFetch({params}:{params:Promise<{userName:string}>}){
const {userName}=await params
const response=await fetch(`http://localhost:3000/backend/getAllPosts`,{
method:"POST",
headers:{'Content-Type':"application/json"}, 
body:JSON.stringify({userName}), 
cache:'no-cache'
})
const  allPosts :AllPostsType[] =await response.json()
return <UIAllPosts userName={userName} allPosts={allPosts}  />
}

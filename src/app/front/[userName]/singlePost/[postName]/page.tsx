import { SinglePostType } from "./UISinglePost";
import UISinglePost from "./UISinglePost";

export  default async function  DataFetch({params}:{params:Promise<{userName:string,postName:string}>}) {
const {userName,postName}= await params
const response=await fetch(`http://localhost:3000/backend/getPostDetails`,{
method:"POST", 
headers:{'Content-Type':"application/json"}, 
body:JSON.stringify({userName,postName}), 
cache:"no-cache"
})
const singlePost :SinglePostType    =await response.json()
return <UISinglePost  userName={userName}  singlePost={singlePost}  />
}
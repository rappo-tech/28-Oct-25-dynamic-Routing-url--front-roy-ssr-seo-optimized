import { ObjType } from "./ClientSection"
import ClientSection from "./ClientSection"

export default async function  DataFetch({params}:{params:Promise<{userName:string,postName:string}>}) {
const {userName,postName}=await params
const response=await fetch(`http://localhost:3000/backend/getPostDetails`,{
method:'POST', 
headers:{'Content-type':"application/json"}, 
body:JSON.stringify({userName,postName}), 
cache:'no-cache'
})
const obj :ObjType  =await response.json()
return <ClientSection obj={obj} />
}
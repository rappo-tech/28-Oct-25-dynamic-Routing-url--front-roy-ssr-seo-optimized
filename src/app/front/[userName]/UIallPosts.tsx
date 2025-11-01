'use client'

import { useRouter } from "next/navigation"

export  interface AllPostsType{
post:string,
imgUrl:string
}
export default function UIAllPosts({userName,allPosts}:{userName:string,allPosts:AllPostsType[]}) {
const router=useRouter()
return (<div>
<p>{userName}</p>

<div>{
allPosts.map((elemnt,index)=>{
return <div key={index}>
<button className="bg-amber-600">{elemnt.post}</button>
<button className="bg-amber-400">{elemnt.imgUrl}</button>
<button onClick={()=>router.push(`/front/${userName}/singlePost/${elemnt.post}/`)}>veiw in details... </button>
</div>
}) 
}</div>



</div>)
}
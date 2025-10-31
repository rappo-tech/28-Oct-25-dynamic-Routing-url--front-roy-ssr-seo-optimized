'use client'

import { useRouter } from "next/navigation"

export interface otherGuyPostType{
post:string, 
imgUrl:string
}

export default  function  ClientSection({userName,otherGuyPost}:{userName:string,otherGuyPost:otherGuyPostType[]}) {
const router=useRouter()
return (<div>
<p>{userName}</p>

<div>{
otherGuyPost.map((element,index)=>{
return <div key={index}>
<button className='bg-sky-600'>{element.post}</button>
<button className="bg-sky-500">{element.imgUrl}</button>
<button onClick={()=>router.push(`/front/${userName}/singlePost/${element.post}`)}>veiw more </button>
</div>
})
  }</div>



</div>)  
}
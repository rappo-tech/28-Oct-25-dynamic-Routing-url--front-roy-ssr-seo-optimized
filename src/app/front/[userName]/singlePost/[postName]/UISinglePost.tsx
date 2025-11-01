'use client'

export interface SinglePostType{
time:string, 
id:string, 
post:string, 
imgUrl:string
}

export default function UISinglePost({userName,singlePost}:{userName:string,singlePost:SinglePostType}) {
return (<div>
<p>{userName}</p>
<div>{
Object.entries(singlePost).map(([key,value])=>(
<p key={key}>{value}</p>
))
    }</div>


</div>)
}
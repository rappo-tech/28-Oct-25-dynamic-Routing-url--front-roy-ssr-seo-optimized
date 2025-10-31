import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function POST(req:NextRequest) {
console.log('post detail req came  ')
    try{
const body=await req.json()
if(!body){
return 
}
const {userName,postName}=body
const findUser=await prisma.allInstaUser.findFirst({
where:{userName}
})
if(!findUser){
return
}
const findPost=await prisma.allPost.findFirst({
where:{userId:findUser.id,post:postName}
})
if(!findPost){
return 
}
console.log(`findPost obj :- id:${findPost.id},post:${findPost.post},imgurl:${findPost.imgUrl},time:${findPost.createdAt}`)
return NextResponse.json({id:findPost.id,post:findPost.post,imgUrl:findPost.imgUrl,time:findPost.createdAt},{status:201})
    }catch{
return NextResponse.json('try catch err',{status:500})
    }
}
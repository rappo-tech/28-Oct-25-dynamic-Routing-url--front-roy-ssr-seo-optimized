import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export  async function POST(req:NextRequest) {
    try{
const body = await req.json()
if(!body){
return NextResponse.json('cant find body ',{status:404})
}
const {userName,post,imgUrl}= body 
const findUser=await prisma.allInstaUser.findFirst({
where:{userName}
})
if(!findUser){
return NextResponse.json('cant  find user ',{status:404})
}
const prismaResponse=await prisma.allPost.create({
data:{
userId:findUser.id, 
post, 
imgUrl
},
select:{id:true}
})
return NextResponse.json(prismaResponse.id,{status:201})
    }catch{
return NextResponse.json(`try catch error `,{status:500})
    }
}
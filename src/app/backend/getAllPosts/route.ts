import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function POST(req:NextRequest) {
    try{
const body=await req.json()
if(!body){
return NextResponse.json('cant find body ',{status:404})
}
const {userName}=body 
const findUser=await prisma.allInstaUser.findFirst({
where:{userName}, 
select:{allPosts:true}
})
if(!findUser){
return NextResponse.json('cant  find user ',{status:404})
}
return NextResponse.json(findUser.allPosts,{status:201})
    }catch{
return NextResponse.json('try cathc err',{status:500})
    }
}
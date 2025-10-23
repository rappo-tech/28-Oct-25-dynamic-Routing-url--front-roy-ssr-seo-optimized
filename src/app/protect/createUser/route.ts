import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { delCache } from "../../../../lib/redisCache";

export async function POST(req:NextRequest) {
console.log('backend req came ')
    try{
const message =await req.json()

if(!message){
return NextResponse.json('cant find  the body ',{status:404})
}
const {userName}=message
console.log(` ${userName} has come `)
const dbResponse=await prisma.allInstaUser.create({
data:{userName}, 
select:{id:true}
})
if(dbResponse.id){
  await delCache('allInstaUsers');
}else{
return NextResponse.json('cache dont dleted ',{status:201})
}

return NextResponse.json(dbResponse.id,{status:201})
    }catch{
return NextResponse.json({error:" try catch error while making request "},{status:500})
    }
}
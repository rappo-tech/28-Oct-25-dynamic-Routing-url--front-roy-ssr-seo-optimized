import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export  async function  POST(req:NextRequest) {
    try{
const body=await req.json()
if(!body){
return NextResponse.json('try catch error',{status:404})
}
const {userName}=body 
const dataResponse= await prisma.allInstaUser.create({
data:{userName}, 
select:{id:true}
})
return NextResponse.json(dataResponse.id,{status:201})
    }catch{
return NextResponse.json('try catch error ',{status:500})
    }
}
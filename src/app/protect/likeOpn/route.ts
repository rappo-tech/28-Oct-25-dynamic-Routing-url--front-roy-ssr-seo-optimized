import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function POST(req:NextRequest) {
    try{
const data=await req.json()
if(!data){
return NextResponse.json('cant find any data ',{status:404})
}
const {optionsName}=data
const findOption=await prisma.options.findFirst({
    where:{optionsName}, 

})
if(!findOption){
return NextResponse.json('cant find options ',{status:404 })
}

await prisma.options.update({
       where: { id: findOption.id },
      data: {
        like: {
          increment: 1 // This adds 1 to the current value
        }
      },
})
return NextResponse.json('like done sucessfully',{status:201})
    }catch{
return NextResponse.json('try catch error',{status:500})
    }
}
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions3";
import prisma from "../../../../lib/prisma";


import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest) {    
try{
const sessionObj=await getServerSession(authOptions)
if(!sessionObj){
return NextResponse.json('un-auth no session found ',{status:401})
}
const{name,email,customToken,image}= sessionObj.user
const body=await req.json()
const {mobile}=body
if(!body){
return NextResponse.json('cant find body',{status:401})
}
console.log(`name:${name},email:${email},token:${customToken},${image},mobil: ${mobile}`)
//save it to prisma database
const response= await prisma.allInstaUser.create({
data:{userName:name,emailId:email,image,token:customToken}, 
select:{id:true}
})
return NextResponse.json(`name:- ${customToken},
    dataBaseId:${response.id} `,{status:201})

}catch{
return NextResponse.json('try catch  error ',{status:500})
}
}
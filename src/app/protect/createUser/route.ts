import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
const message =await req.json()

if(!message){
return NextResponse.json('cant find  the body ',{status:404})
}
const {userName}=message
console.log(` ${userName} has come `)
return NextResponse.json({sucess:"userName msg came "},{status:201})
    }catch{
return NextResponse.json({error:" try catch error while making request "},{status:500})
    }
}
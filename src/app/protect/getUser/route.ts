import { NextResponse } from "next/server";
export async function GET() {
try{
const allUsers=['user1','user2','user3']
console.log(`backend request came... `)
return NextResponse.json(allUsers,{status:201})
}catch{
return NextResponse.json('try catch error ',{status:500})
}
}

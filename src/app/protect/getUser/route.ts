import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
try{
const all= await prisma.allInstaUser.findMany()
return NextResponse.json(all,{status:201})
}catch{
return NextResponse.json('try catch error ',{status:500})
}
}

import { NextResponse } from "next/server";
import { delCache } from "../../../../lib/redisCache";

export async function POST() {
try{
  await delCache('allInstaUsers');
  return NextResponse.json('cache deletd',{status:201});
}catch{
return NextResponse.json('try catch error',{status:500})
}





}
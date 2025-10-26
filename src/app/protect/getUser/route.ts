import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getCache,setCache } from "../../../../lib/redisCache";


export async function GET() {
  console.log('get req came');
  
  const cacheKey = 'allInstaUsers';
  
  try {
    const cached = await getCache(cacheKey);
    if (cached) {
      console.log('✅ Data from REDIS cache');
      return NextResponse.json({ 
        data: cached, 
        source: 'redis' // 🟢 Shows source
      }, { status: 201 });
    }
    
    console.log('❌ Cache miss - fetching from DB');
    const allUser = await prisma.allInstaUser.findMany();
    
    await setCache(cacheKey, allUser, 300);
    
    console.log(`💾 Data saved to Redis, prisma data:${allUser}`);
    return NextResponse.json({ 
      data: allUser, 
      source: 'database' // 🟢 Shows source
    }, { status: 201 });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json('Server error', { status: 500 });
  }
}
/*

import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
console.log(`req came`)
  try{
const allInstaUser=await prisma.allInstaUser.findMany()
console.log(allInstaUser)
return NextResponse.json(allInstaUser,{status:201})
  }catch{
  return NextResponse.json('try catch error ',{status:500})
  }
}
*/



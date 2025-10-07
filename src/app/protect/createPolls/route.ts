import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function POST(req:NextRequest) {
console.log(`1 req came `)
try{
type optionArr={
optionsName:string, 
like:number
}
//frontend send:-questions + optionsArray where  optionsName  is there  
const data =await req.json() as {userName:string,question:string,Options:optionArr[]}
console.log(data)
if(!data){
return NextResponse.json('no data found ',{status:404})
}
const  {userName,question,Options}= data 
console.log(`3.${userName},${question},${Options}`)
const findUser=await prisma.allInstaUser.findFirst({
where:{userName},
include:{allPolls:true}
})
console.log(`4.${findUser?.userName}`)
if(!findUser){
console.log('4.cant find user ')
return NextResponse.json('cant find user',{status:404})
}
const response= await prisma.allPolls.create({
data:{userId:findUser.id,question,
options:{
create:Options.map(option=>({
optionsName:option.optionsName , 
like:0
}))
},
}, 
select:{
id:true, 
}
})
console.log(`created poll sucess, ${response.id}`)
return NextResponse.json(response.id,{status:201})

}catch{
return NextResponse.json('try catcg error ',{status:500}) 
}
}
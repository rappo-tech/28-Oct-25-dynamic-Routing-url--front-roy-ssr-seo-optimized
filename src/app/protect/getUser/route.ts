import { NextRequest, NextResponse } from "next/server";
//if req  has 'none' then send allUsers
//if req has  'name'  then send only name,pin,city 
export async function POST(req:NextRequest) {
try{
const allUsers= [
{name:"u1",pin:8939483,city:"la",msg:'you send empty name'}, 
{name:"u2",pin:762732,city:"europe", msg:'you send empty name' },
{name:"u3",pin:999234,city:"asia",msg:'you send empty name' },
{name:"u1",pin:8939483,city:"singapore",msg:'you send empty name' },
  ]
const body=await req.json()
console.log(body)
if(!body){
return NextResponse.json({error:"error "},{status:404})
}  
const {name}=body

const findName=(name:string)=>{
const findUser=allUsers.find((users)=>name===users.name)
if(!findUser){
return 
}
const arr=  [{name:findUser.name,pin:findUser.pin,city:findUser.city}]
return arr
} 

if(name===''){
return NextResponse.json(allUsers,{status:201})
}else{
console.log(findName(name))
return NextResponse.json(findName(name),{status:201})
}

}catch{
return NextResponse.json('try catch error ',{status:500})
}
}

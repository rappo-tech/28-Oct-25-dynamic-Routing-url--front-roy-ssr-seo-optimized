import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const JWT_SECRET= new TextEncoder().encode(process.env.JWT_SECRET as string)

export async function middleware(req:NextRequest) {  
console.log('1.middleware req came ')
try{
console.log('2.try  middle ware req came ')
const token=req.cookies.get('custom-token')?.value||
req.headers.get('Authorixation')?.replace('Bearer '," ")
console.log(`3.this is token :- ${token }`)

if(!token){
console.log(`token not found we are fucked `)
if(req.nextUrl.pathname.startsWith('/api/')){
return NextResponse.json({error:"no token found "},{status:403})
}
return NextResponse.redirect(new URL('/login',req.url))
}

const {payload}=await jwtVerify(
token,
JWT_SECRET
)
console.log ('4.verified token for ',payload.name,payload.email)
return NextResponse.next()

}catch(error){
const jwterror=error as {code?:string,message?:string}
console.log('error while jwt ',jwterror)

if(jwterror.code==='ERR_JWT_EXPIRED'){
console.log('jwt token expired ')
const response=NextResponse.redirect(new URL('/login',req.url))
response.cookies.delete('custom-token')
return response
}



if(req.nextUrl.pathname.startsWith('/api/')){
return NextResponse.json({error:"un-auth"},{status:403})
}


return NextResponse.redirect(new URL('/login',req.url))
}
}

export const  config={
matcher:[
        "/courses/:path*",
    "/home",
    "/vdo/:path*",
    "/bounty",
    "/dashboard/:path*",
    "/api/((?!auth).)*",  // This matches /api/* but excludes /api/auth/*
    "/protect/:path*",
]
}





/*
try{
//1.get the custom_token  from cookies || from headers 
//2.if no token  f= redirect /login.tsx || b=res(error,403)
//3.verify custom token
}catch(error){
const jwtError=error as {code?:string,message?:string}
console.log(`jwt error ${jwtError}`)
//4.if error===expire{
// delete the cookies`s cutomToken,redirect /login.tsx 
//}
//5.f==== redircet it to /login.tsx page 
//6.b=== next res {unauathorised , 403 }
}
*/












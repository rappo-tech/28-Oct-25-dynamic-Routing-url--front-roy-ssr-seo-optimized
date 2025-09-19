import { jwtVerify } from "jose"
import { NextRequest, NextResponse } from "next/server"
export async function middleware(req:NextRequest) {
console.log('middleware req came')
try{
const token=req.cookies.get('custom-token')?.value ||
req.headers.get('Authorization')?.replace('Bearer', "")
console.log(token)
if(!token){
if(req.nextUrl.pathname.startsWith('/api/')){
return NextResponse.json({error:"token not valid "},{status:404})
}

return NextResponse.redirect(new URL("/login",req.url))
}
const {payload}=await jwtVerify(token as string,
new TextEncoder().encode(process.env.JWT_SECRET)
)
console.log(payload.email)
return NextResponse.next()
}catch(error){
const jwterror=error as {code?:string,message?:string}
if(jwterror.code==='ERR_JWT_EXPIRED'){
console.log('token expired ')
const response=NextResponse.redirect(new URL('/login',req.url))
return response
}


if(req.nextUrl.pathname.startsWith('/api/')){
return NextResponse.json({error:"token not valid "},{status:404})
}

return NextResponse.redirect(new URL("/login",req.url))
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












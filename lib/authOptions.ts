import { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { SignJWT,jwtVerify } from "jose";
export const authOptions :AuthOptions={
providers:[GoogleProvider({
clientId:process.env.GOOGLE_CLIENT_ID  as string,
clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
authorization:{
params:{
    prompt: "select_account consent",// ✅ Always show Google account chooser with consent
          access_type: "offline",        // Optional: for refresh token
          response_type: "code",         
}
}
})], 
callbacks:{
async jwt({user,token,account}){
if(user){
token.sub=user.id;
token.name=user.name;
token.email=user.email;
token.customToken=user.customToken;

if(account?.provider==='google'){
token.customToken=await new SignJWT({
id:token.sub,
email:token.email
})
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("12h")
            .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}
}else{
try{
if(token.customToken){
await jwtVerify(token.customToken, 
new TextEncoder().encode(process.env.JWT_SECRET)
)
}
}catch(error){
const jwterror=error as {code?:string,message?:string}
console.log(`jwt error occured  ${jwterror}`)
token.customToken=await  new SignJWT({
id:token.sub, 
email:token.email
})
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("24h")
            .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}
}
return token
}, 
async session({token,session}){
if(session.user){
session.user.id=token.sub as string;
session.user.name=token.name as string;
session.user.email=token.email as string;
session.user.customToken=token.customToken as string;
}
return session
}
}, 
session:{strategy:'jwt'}, 
secret:process.env.NEXTAUTH_SECRET 
}
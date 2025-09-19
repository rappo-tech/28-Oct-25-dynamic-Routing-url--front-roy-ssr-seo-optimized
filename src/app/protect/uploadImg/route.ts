import { NextRequest, NextResponse } from "next/server";
import { validateFile,generateFileName,uploadToCloudinary } from "../../../../utilis/cloudinary";

export async function POST(req:NextRequest) {
console.log(`try req came `)
try{
const frontendFile=await req.formData() 
if(!frontendFile){
console.log(`cant find the frontend file `)
return NextResponse.json('cant  find the frontend file',{status:403})
}
const file=await frontendFile.get('file') as File
console.log(file)
const {isValid}=validateFile(file)
if(!isValid){
console.log(' inValid  file ame ')
return NextResponse.json('in valid ',{status:403})
}
const fileName=generateFileName(file.name)
    const bytes = await file.arrayBuffer();//broswer buffer 
    const buffer = Buffer.from(bytes);//node js buffer 
    console.log(`5.buffer created (size: ${buffer.length} bytes)`);
const {publicId,url}=await uploadToCloudinary(buffer,fileName)
console.log (`PId:${publicId},url:${url}`)
return NextResponse.json({publicId,url},{status:201})
}catch{
return NextResponse.json('try catch error ',{status:500})
} 
}
import { NextRequest, NextResponse } from "next/server";
import { validateFile,generateFileName,uploadToCloudinary } from "../../../../utilis/cloudinary";

export async function POST(req:NextRequest) {
console.log('1.uploadImg req came ')
try{
const formData=await req.formData()
if(!formData){
console.log('2.no form data found ')
return NextResponse.json('form data not came ',{status:404})
}
const file=formData.get('file') as File 
console.log(file )
const {isValid}=await validateFile(file)
if(!isValid){
console.log('4.notvalid ')
return NextResponse.json('file is too long ')
}
    // Convert to buffer (NO BASE64 ENCODING)
    const bytes = await file.arrayBuffer();//broswer buffer 
    const buffer = Buffer.from(bytes);//node js buffer 
    console.log(`5.buffer created (size: ${buffer.length} bytes)`);

    // Generate file name
    const fileName = generateFileName(file.name);
    console.log(`6.fileName generated: ${fileName}`);

const {publicId,url}=await uploadToCloudinary(buffer,fileName)
console.log(`publicId:${publicId},url:${url}`)
return NextResponse.json({publicId,url},{status:201})
}catch{
return NextResponse.json('try catch backend error ',{status:500})
}
}
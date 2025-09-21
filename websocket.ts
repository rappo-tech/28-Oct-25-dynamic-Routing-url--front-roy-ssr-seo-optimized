import { WebSocketServer,WebSocket } from "ws";
import http from 'http'
const server=http.createServer()
const wss= new WebSocketServer({server})
const allRooms:Record<string,Set<WebSocket>> ={}
 
wss.on('connection',(socket:WebSocket)=>{

socket.on('message',(data:string)=>{
const parsedData= JSON.parse(data) as {action:string,roomId:string,vdoUrl:string,userName?:string}
const {roomId,vdoUrl,userName}=parsedData
if(parsedData.action==='JOIN'){
if(!allRooms[roomId]){
allRooms[roomId]=new Set()
}
allRooms[roomId].add(socket)
socket.send(JSON.stringify({type:"JOIN",msg:`${userName} joined  the room `}))
}else if(parsedData.action==='VDO_URL'){
if(allRooms[roomId]){
allRooms[roomId].forEach((client)=>{
if(client.readyState===WebSocket.OPEN){
client.send(JSON.stringify({type:'VDO_URL',msg:` this user ${userName}, this vdo ${vdoUrl}`}))
}
})
}
}
})

socket.on('close',()=>{
for(const roomId in allRooms){
allRooms[roomId].delete(socket)
}
console.log('websocket closed')
})


})





server.listen(8080,()=>console.log('websocket server started at port:8080'))
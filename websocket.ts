import { WebSocketServer,WebSocket } from "ws";
import http from  'http'
const server= http.createServer()
const wss= new WebSocketServer({server})
const allRooms :Record<string,Set<WebSocket>> ={}

wss.on('connection',(socket:WebSocket)=>{

socket.on('message',(data:string)=>{
const parsedData=JSON.parse(data) as {action:string,roomName:string,msg?:string}
const {action,roomName,msg}=parsedData

const sendMsg=()=>{
if(!allRooms[roomName]){
allRooms[roomName]=new Set()
}
allRooms[roomName].add(socket)
allRooms[roomName].forEach((client)=>{
if(client.readyState===WebSocket.OPEN){
client.send(JSON.stringify({type:"JOIN",msg:msg}))
}
})
}

if(action==='JOIN'){
if(!allRooms[roomName]){
allRooms[roomName]=new Set()
}
allRooms[roomName].add(socket)
allRooms[roomName].forEach((client)=>{
if(client.readyState===WebSocket.OPEN){
client.send(JSON.stringify({type:"MSG",totalNo:allRooms[roomName].size,msg:"someone joind  the rooms "}))
}
})
}
if(action==='MSG'){
sendMsg()
}
})
socket.on('close',()=>{
for(const roomName in allRooms){
allRooms[roomName].delete(socket)
console.log('websocket   closed !!! ')
}
})

})






server.listen(8080,()=>console.log('websocket server started at port:8080'))
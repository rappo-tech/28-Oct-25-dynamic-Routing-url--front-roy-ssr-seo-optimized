import { WebSocketServer,WebSocket } from "ws";
import http from 'http'

type EventType=|'join'|'offer'|'answer'|"ice-candidate"

interface IncomingSocketType{
type:EventType|string, 
peers?:string[], 
roomId?:string, 
clientId?:string, 
to?:string, 
sdp?:string|Record<string,unknown>, 
candidate?:string|Record<string,unknown>, 
[key: string]: unknown
}

interface socketType extends WebSocket{
clientId:string;
roomId:string;
lastMsgTimeStamp?:number[]// Date.now() to 1000ms only have 
}

const  server= http.createServer()
const  wss=new WebSocketServer({server})
const  AllRooms: Map<string,Map<string,WebSocket>>  =new Map()

//within 1000ms only 30 request|| each 1 second only take 30msg max 
const WITHIN_TIME_LIMIT=1000; 
const MAX_REQ=30

//rate limit 
const  allowRateLimit=(ws:socketType):boolean=>{
const now=Date.now()

if(!ws.lastMsgTimeStamp) ws.lastMsgTimeStamp=[]

//first check point 
ws.lastMsgTimeStamp=ws.lastMsgTimeStamp.filter((t)=>
now-t<WITHIN_TIME_LIMIT
//1700-1200=500<100 then false filter out that 
)
console.log(`filterd array :- ${ws.lastMsgTimeStamp}`)

//second check point if it passes then add that  to arr || return false 
if(ws.lastMsgTimeStamp.length>MAX_REQ)
return  false    

//third check point 
ws.lastMsgTimeStamp.push(now) 
console.log('pushed  into the timestamp array  ')
return true;
}

wss.on('connection',(socket:socketType)=>{

socket.on('message',(inomcingSocketMsg:string)=>{
if(!allowRateLimit(socket)){
socket.send(JSON.stringify({type:"error",msg:"exceeded rate limit "}))
}
const parsedIncomingSocketMsg :IncomingSocketType = JSON.parse(inomcingSocketMsg)
if(parsedIncomingSocketMsg.type==='join'){
const {roomId,clientId}=parsedIncomingSocketMsg
console.log(parsedIncomingSocketMsg)
if(!roomId || !clientId){
socket.send(JSON.stringify({type:"error", msg:"eithier roomId or clientId is not aviable "}))
return 
}
socket.roomId=roomId
socket.clientId=clientId
if(!AllRooms.has(roomId))AllRooms.set(roomId,new Map())
const findRoom=AllRooms.get(roomId)!

socket.send(JSON.stringify({type:"existing-peers",peers:Array.from(findRoom.keys())}))
console.log('existing peers',Array.from(findRoom.keys()))

findRoom.forEach((wss)=>{
if(wss.readyState===WebSocket.OPEN){
wss.send(JSON.stringify({type:"new-peer",msg:`this user ${clientId} has been added to new peer `}))
console.log('new peer is added ')
}
})

findRoom.set(clientId,socket)
}else if(parsedIncomingSocketMsg.type==='offer'|| parsedIncomingSocketMsg.type==='answer'||parsedIncomingSocketMsg.type==='ice-candidate'){
const {to}=parsedIncomingSocketMsg
const {roomId}=socket

if(!to || !roomId){
socket.send(JSON.stringify({type:"error",msg:"no roomId || traget user find"}))
return 
}

const findRoom=AllRooms.get(roomId)!
const findUser=findRoom.get(to)

if(findUser && findUser.readyState===WebSocket.OPEN){
findUser.send(JSON.stringify({...parsedIncomingSocketMsg,from:socket.clientId}))
console.log(`msg gone `)
}


}


    
})

socket.on('close',()=>{
const {clientId,roomId}=socket
if(!clientId || !roomId){
return 
}
const  findRoom= AllRooms.get(roomId)!
findRoom.delete(clientId)
console.log(`client gone from the room `)
if(findRoom.size===0)AllRooms.delete(roomId)
})

})

process.on('SIGINT',()=>{
wss.close(()=>{
console.log('websocket closed ')
server.close(()=>{
console.log('http server closed ')
process.exit(0)
})
})
})


server.listen(5001,()=>console.log('websocket server strated at port 5001'))
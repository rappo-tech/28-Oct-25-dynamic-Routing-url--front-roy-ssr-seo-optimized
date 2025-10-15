import { WebSocketServer,WebSocket } from "ws";
import  http from  'http'

type EventType=|'join'|'offer'|"answer"|'ice-candidate'


interface IncomingMsgType{
type:EventType|string, 
peers?:string[], 
clientId?:string, 
roomId?:string, 
to?:string, 
sdp?:string|Record<string,unknown>, 
candidate?:string|Record<string,unknown>, 
[key:string]:unknown
}

interface SocketType extends WebSocket{
clientId:string, 
roomId:string, 
timeArr:number[]
}

const server= http.createServer()
const wss= new WebSocketServer({server})
const AllRooms :Map<string,Map<string,WebSocket>> = new Map()
const WITHIN_TIME=1000; 
const MAX_MSGS=30
const PORT= Number(process.env.PORT)

//if in 1 sec=30 msg is coming then good if more then; ddos happeing 
const legitUser=(socket:SocketType):boolean=>{
const now=Date.now()
if(!socket.timeArr)socket.timeArr=[]
//filter out the array within times 
socket.timeArr=socket.timeArr.filter((times)=>
now-times<WITHIN_TIME)
//cehck if arr.length is under max_msg if not then block user
if(socket.timeArr.length>MAX_MSGS) return false 
//if both contion met the push the now in times array 
socket.timeArr.push(now)
return true 
}



wss.on('connection',(socket:SocketType)=>{

socket.on('message',(incomingSocketMsg:string)=>{
if(!legitUser(socket)){
socket.send(JSON.stringify({type:"error",msg:"ddos  "}))
return 
}
const parsedIncomingMsg :IncomingMsgType =JSON.parse(incomingSocketMsg)
if(parsedIncomingMsg.type==='join'){
const {clientId,roomId}=parsedIncomingMsg
if(!clientId || !roomId){
return 
}
socket.clientId=clientId
socket.roomId=roomId

if(!AllRooms.has(roomId))AllRooms.set(roomId, new Map())
const findRoom=AllRooms.get(roomId)

if(!findRoom){
  socket.send(JSON.stringify({type:"error",msg:"room not found"}))
  return
}

socket.send(JSON.stringify({type:'existing-peers',peers:Array.from(findRoom.keys())}))
console.log(`exisiting peers :- ${Array.from(findRoom.keys())}`)

findRoom.forEach((wss)=>{
if(wss.readyState===WebSocket.OPEN){
wss.send(JSON.stringify({type:"new-peer",msg:` this new peer has joind ${clientId}`}))
console.log(`this new user ${clientId} has joined the room `)
}
})

findRoom.set(clientId,socket)
console.log(`this user ${clientId} has joined the room ${roomId}`)
}else if(parsedIncomingMsg.type==='ice-candidate'||parsedIncomingMsg.type==='answer'||parsedIncomingMsg.type==='offer'){
const {to}=parsedIncomingMsg
const {roomId}=socket
if(!to || !roomId){
return 
}
const findRoom=AllRooms.get(roomId)
if(!findRoom){
  return
}
const findUser=findRoom.get(to)

if(findUser && findUser.readyState===WebSocket.OPEN ){
findUser.send(JSON.stringify({...parsedIncomingMsg,from:socket.clientId}))
console.log('offer||answer||canidate msg gone ')
}


}






})


socket.on('close',()=>{
const {clientId,roomId}=socket
if(!clientId || !roomId){
return 
}
const findRoom=AllRooms.get(roomId)
if(!findRoom){
return 
}
if(findRoom)findRoom.delete(clientId)
  findRoom.forEach((peer)=>{
      if(peer.readyState===WebSocket.OPEN){
        peer.send(JSON.stringify({type:"peer-left",clientId}))
      }
    })
if(findRoom.size===0)AllRooms.delete(roomId)
console.log(`this user ${clientId} has leave the room `)
})

socket.on('error',(err)=>{
  console.error(`Socket error for ${socket.clientId}:`,err)
})

})

const shutdown=()=>{
wss.close(()=>{
server.close(()=>{
process.exit(0)
})
})
console.log('wss and http server closed ')
}

process.on('SIGINT',shutdown)
process.on('SIGTERM',shutdown)

server.listen(PORT,()=>console.log(`websocket server live at port:${PORT}`))

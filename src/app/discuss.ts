import http from 'http'
import { WebSocketServer,WebSocket } from 'ws'

type eventType=
|'join'
|'offer'
|'answer'
|'ice-candidate'
|'existing-peers'
|'new-peer'
|'peer-left'



interface incomingMsgType{
type:eventType|string, 
peers?:string[], 
clientId?:string, 
roomId?:string,
to?:string,
sdp?:string,
candidate?:string,
from?:string,
othersPeerId?:string, 
}

interface websocketType extends WebSocket{
clientId:string, 
roomId:string, 
isAlive:boolean
}

const  server=http.createServer()
const AllRooms: Map<string, Map<string,websocketType>>   = new Map()
//AllRooms={test_room:{u1:ws1,u2:ws2,u3:ws3, ... }}
const  wss= new WebSocketServer({server})

wss.on('connection',(socket:websocketType)=>{



socket.on('message',(msg:string)=>{
const message :incomingMsgType =JSON.parse(msg)

if(message.type==='join'){
const {clientId,roomId}= message
console.log(` client Id:- ${clientId }`)

if(!clientId || !roomId){
socket.send(JSON.stringify({type:"error",msg:"client or roomId not found "}))
return 
}

socket.clientId=clientId
socket.roomId=roomId

if(!AllRooms.has(roomId))AllRooms.set(roomId,new Map())
const findRoom=AllRooms.get(roomId)!
socket.send(JSON.stringify({type:"existing-peers",peers:Array.from(findRoom.keys())}))
console.log(`peers :- ${Array.from(findRoom.keys())}`)
findRoom.forEach((wss)=>{
if(wss.readyState===WebSocket.OPEN){
wss.send(JSON.stringify({type:"new-peer",msg:`${socket.clientId} joinned the room `}))
console.log(`new peer is added ${socket.clientId}`)
}
})
findRoom.set(clientId,socket)
}else if(message.type==='offer' || message.type==='answer' || message.type==='ice-candidate'){
const {to}= message
const roomId=socket.roomId
if(!to || !roomId){
return 
}
const findRoom=AllRooms.get(roomId)!
const findUser=findRoom.get(to)
if(findUser && findUser.readyState===WebSocket.OPEN){
findUser.send(JSON.stringify({...message,from:socket.clientId}))
console.log(`send either offer || answer || iceCandidate `)
}

}





})


//when a user close his websocket 
socket.on('close', () => {
  const { roomId, clientId } = socket;
  if (!roomId || !clientId) return;

  const room = AllRooms.get(roomId);
  room?.delete(clientId);

  // Notify others
  room?.forEach((peer) => {
    if (peer.readyState === WebSocket.OPEN) {
      peer.send(JSON.stringify({ type: 'peer-left', clientId }));
    }
  });

  if (room?.size === 0) AllRooms.delete(roomId);
});



//when devloper close all the websockets 
process.on('SIGINT',()=>{

AllRooms.forEach((room)=>{
room.forEach((wss)=>{
wss.close()
})
})
AllRooms.clear()

   wss.close(() => {
        console.log('WebSocket server closed')
        
        // 3. Close HTTP server (IMPORTANT!)
        server.close(() => {
            console.log('HTTP server closed')
            process.exit(0)
        })
    })


})





})
server.listen(5001,()=>console.log('websocket server started at port:5001'))






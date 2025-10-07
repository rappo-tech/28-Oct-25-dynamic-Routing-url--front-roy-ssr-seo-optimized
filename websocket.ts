import http from 'http'
import { WebSocketServer,WebSocket } from 'ws'
//create  a room inside the allRooms objects i.e- //AllRooms={roomId1:{user1:ws1},{user2:ws2},{user3:ws3},{user4:ws4},{}}
//send a msg to all users  inside the allRooms objects
//send a msg to 1:1 only 1 user create it using Map 

const server=http.createServer()
const  wss = new WebSocketServer({server})
const AllGroups :Map<string,Map<string,WebSocket>>= new Map()
// .has() .get()  .set() 
/*
allGroups={clientGroups :{clinet1,ws1},{c2:ws2},{c3:ws3},{c4:ws4}, 
collegueGroups :{collegue1:ws1},{c2:ws2},{c3:ws3},{c4:ws4}, 
driverGroups :{driver1:ws1},{d2:ws2},{d3:ws3},{d4:ws4}
}
*/

wss.on('connection',(socket:WebSocket)=>{



socket.on('message',(data:string)=>{
const parsedData=JSON.parse(data) as {type:string,groupId:string,senderUser:string,msg:string,reciverUser:string}
const  {type,groupId,senderUser,msg,reciverUser}=parsedData

//join room and if no room is there then  create one 
const sendJoin=()=>{
if(!AllGroups.has(groupId)){
AllGroups.set(groupId, new Map())
}
AllGroups.get(groupId)!.set(senderUser,socket)
AllGroups.get(groupId)?.forEach((socket,senderUser)=>{
if(socket.readyState===WebSocket.OPEN){
socket.send(JSON.stringify({type:"JOIN",sender:senderUser,msg:`new ${senderUser} has joined this group ${groupId}`,peers:AllGroups.has(groupId)}))
console.log(AllGroups.has(groupId))
}
})
}



//send msg to all users in group 
const sendGroup=()=>{
if(AllGroups.get(groupId)){
AllGroups.get(groupId)?.forEach((socket,userId)=>{
if(socket.readyState===WebSocket.OPEN){
socket.send(JSON.stringify({type:"GROUP_CHAT",sender:userId,msg:msg.toUpperCase()}))
console.log(`msg :- ${msg.toUpperCase()} `)
}
})
}
}


const oneOnOneMsg=()=>{
if(AllGroups.get(groupId)){
const targetUser= AllGroups.get(groupId)?.get(reciverUser)
if(targetUser){
if(targetUser.readyState===WebSocket.OPEN){
targetUser.send(JSON.stringify({type:"SINGLE_CHAT",sender:senderUser,msg}))
}
}
}
}







if(type==='JOIN'){
sendJoin()
}else if(type==='GROUP_CHAT'){
sendGroup()
}else if(type==='SINGLE_CHAT'){
oneOnOneMsg()
}


 




})


//when a user leaves the websocket 
socket.on('close',()=>{
AllGroups.forEach((group)=>{
group.forEach((ws,userId)=>{
if(ws===socket){
group.delete(userId)
}
})
})

})


//close the file on terminal websocket.ts closed by devoper
process.on('SIGINT',()=>{

AllGroups.forEach((group)=>{
group.forEach((socket)=>{
socket.close()
})
})
AllGroups.clear()
server.close(()=>{
process.exit(0)
})

})




})


server.listen(8080,()=>console.log('websocket server running on port 8080'))



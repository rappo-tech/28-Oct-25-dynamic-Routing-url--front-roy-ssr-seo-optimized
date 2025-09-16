import { WebSocketServer,WebSocket } from "ws";
import http from 'http'
const server=http.createServer()
const allActiveUser :{userName:string,socket:WebSocket}[] =[]
const wss= new WebSocketServer({server})


wss.on('connection',(socket:WebSocket)=>{

socket.on('message',(data:string)=>{
const parsedMsg=JSON.parse(data) as {action:string,userName:string,msg?:string,reciver?:string}
const {action,userName,msg,reciver}=parsedMsg

const joinTheUser=()=>{
const findUser=allActiveUser.find((x)=>x.userName===userName)
if(findUser){
return console.log('that user is alredy existed ')
}else{
allActiveUser.push({userName,socket})
socket.send(JSON.stringify({type:"JOIN",msg:`welcome ${userName} online `}))
console.log(allActiveUser)
}
}

const sendMsg=()=>{
const findUser=allActiveUser.find((x)=>x.userName===userName)
const findReciver=allActiveUser.find((x)=>x.userName===reciver)
if(!findReciver || !findUser){
return console.log(`eihetr of them are offline `)
}else{
if(findReciver.socket.readyState===WebSocket.OPEN){
findReciver.socket.send(JSON.stringify({type:"MSG",sender:userName,msg:msg}))
}
}


}




if(action==='JOIN'){
joinTheUser()
}else if(action==='MSG'){
sendMsg()
}


})

socket.on('close', () => {
  // remove that socket from active users
  const index = allActiveUser.findIndex((x) => x.socket === socket);
  if (index !== -1) {
    console.log(`${allActiveUser[index].userName} disconnected`);
    allActiveUser.splice(index, 1);
  }
});


})






server.listen(8080,()=>console.log('websocketserver started at port 8080'))
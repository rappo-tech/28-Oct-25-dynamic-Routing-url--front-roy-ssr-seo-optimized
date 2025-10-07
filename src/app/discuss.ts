/*
1.//create  a room inside the allRooms objects i.e- //AllRooms={roomId1:{user1:ws1},{user2:ws2},{user3:ws3},{user4:ws4},{}}
//send a msg to all users  inside the allRooms objects
//send a msg to 1:1 only 1 user create it using Map 

user1 send to ws :{roomId1,userName,msg}
user2 send to ws :{roomId1,userName,msg}
user3 send to ws :{rooId1,userName,msg}
user1 send to 1:1 msg ws:{roomId1,sender:user1,reciver:user2,msg}



2.make a webscoket fronted and websocket server like vdoCall
with  all functions and in server also  with 2 users in 
different browsers 

frontend()

user1                                 
start()*send type:"join",user1Id                       
handleWebMsgs()*                  
createOffer()*send type:"offer",sdp:user1`s  sdp                    
createPeerConnection()* send type:'iceCandidate',iceCandidate:candidate          
handleIceCandidate()*                             
handleOffer()---                           
handleAnswer()*                              
end()*      


user2                                 
start()*send type:"join",user2Id                       
handleWebMsgs()*                  
createOffer()---              
createPeerConnection()* send type:'iceCandidate',iceCandidate:candidate          
handleIceCandidate()*                             
handleOffer()*send type:"answer",sdp:user2sdp              
handleAnswer()----                           
end()*     


backend() websocketServer.ts 

wss.on msg.type
join,
offer,(sdp)
answer,(sdp)
iceCandidate,






*/
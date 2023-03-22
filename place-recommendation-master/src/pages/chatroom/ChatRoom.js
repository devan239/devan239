import { projectAuth, projectFirestore } from "../../firebase/config"

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SendIcon from '@material-ui/icons/Send';
import "./ChatRoom.css";
import { useChat } from "../../hooks/useChat"
import { useCollection } from '../../hooks/useCollection'

import Chats from "../../components/Chats";


export default function ChatRoom({placeName}) {

  const location = useLocation()
  const place = location.state
  const {sendMessage, error, isPending,chats, fetchMessage} = useChat()
  const [msgToSend, setMsgToSend ] = useState("")
  const { documents, e } = useCollection(place.Name)
    
  const [allMessages, setAllMessages] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // var c = []
    // setLoading(true)
    // projectFirestore.collection("chatbox").doc(place.Name).collection('messages')
    // .orderBy('sentAt')
    // .onSnapshot((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         if(doc) {
    //             c.push(doc.data())
    //         console.log(doc.data());
    //         }
    //     })  
    // })
    console.log("USe Effect");
    // fetchMessage(place.Name)
    // return () => {unsubscribe()}
  },[] )

  const send = () => {
    sendMessage(msgToSend, place.Name )
    setMsgToSend("")
  }
  console.log(documents); 
  
  return (
    <div className="chat-room">
      <div className="show-chat">
        {documents.map((chat) => (<Chats key={chat.sentAt} c={chat}></Chats>))}
        
      </div>
      <div className="get-input">
        <input 
          className="chat-input" 
          type="text"
          onChange={(e) => setMsgToSend(e.target.value)}
          value={msgToSend}
           />

           <div className="btn send" onClick={() => send() }>
             <SendIcon className="icon"/>
           </div>


      </div>
    </div>
  )
}

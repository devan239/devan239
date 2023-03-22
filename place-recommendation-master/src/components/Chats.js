import React from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

export default function Chats({c}) {
    const { dispatch, user } = useAuthContext()

    
  return (
    <div className="chatting-box">
        <div className={c.sentBy == user.uid ? "from-me" : "from-them"}>
            <p>{c.messageText}</p>
        </div>

        
        
    </div> 
  )
}

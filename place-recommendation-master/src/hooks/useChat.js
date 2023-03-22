import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { useEffect, useState } from "react"


export const useChat = () => {

    const [ isCancelled, setIsCancelled ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ isPending, setIsPending ] = useState(false)
    const { dispatch, user } = useAuthContext()
    const [chats, setChats ] = useState([])

    const fetchMessage = async (placeName) => {
        const allMessages = []
        setIsPending(true)
        try{
            await projectFirestore.collection("chatbox").doc(placeName).collection('messages')
            .orderBy('sentAt')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(doc) {
                        allMessages.push(doc.data())
                    console.log(doc.data());
                    }
                })  
            })
            console.log(isPending);
            setChats(allMessages)
       
        }catch(err){
            setError(err)
        }
            setIsPending(false)
            // return allMessages
            
    }

    const sendMessage = async (messageText, placeName) => {
        setError(null)
        setIsPending(true)
        // console.log(user.uid);
        const message = {
            messageText,
            sentAt : Date.now(),
            sentBy : user.uid
        }
        try {
            projectFirestore.collection("chatbox").doc(placeName)
                    .collection('messages')
                    .add(message)
                    
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }catch (error){
            if(!isCancelled){
                setError(error.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    })

    return {sendMessage, error, isPending, chats, fetchMessage}

}
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { useEffect, useState } from "react"


export const useUploadBlog = () => {

    const [ isCancelled, setIsCancelled ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ isPending, setIsPending ] = useState(false)
    const { dispatch, user } = useAuthContext()
    const [blogs, setBlogs ] = useState([])

    const fetchBlog = async (placeName) => {
        const allBlogs = []
        setIsPending(true)
        try{
            await projectFirestore.collection(placeName)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(doc) {
                        allBlogs.push(doc.data())
                    //console.log(doc.data());
                    }
                })  
            })
            setBlogs(allBlogs)
            console.log(allBlogs);
       
        }catch(err){
            setError(err)
        }
            setIsPending(false)
            // return allMessages
            
    }

    const uploadBlog = async (place, blog) => {
        setError(null)
        setIsPending(true)
        // console.log(user.uid);
        const toUpload = {
            ...blog,
            sentBy : user.displayName
        }
        
        try {
            projectFirestore.collection(place)
                    .add(toUpload)
                    
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

    return {uploadBlog, error, isPending, fetchBlog, blogs}

}
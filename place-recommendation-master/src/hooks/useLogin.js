import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useLogin = () => {

    const [ isCancelled, setIsCancelled ] = useState(false)

    const [error, setError ] = useState(null)
    const [ isPending, setIsPending ] = useState(false)

    const { dispatch } = useAuthContext()
    const login = async (email, password) => {

        setError(null)
        setIsPending(true)

        try {
            const response = await projectAuth.signInWithEmailAndPassword(email, password)

            if(!response){
                throw new Error('Could not login')
            }

            dispatch({type: 'LOGIN', payload: response.user})
            
            await projectFirestore.collection('users').doc(response.user.uid).update({
                online : true
            })

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        } catch (error) {
            if(!isCancelled){
                setError(error.message)
                setIsPending(false)
            }
            
        }

        
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    })

    return { login, error, isPending }

}
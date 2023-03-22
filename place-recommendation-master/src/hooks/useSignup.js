import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useSignup = () => {

    const [ isCancelled, setIsCancelled ] = useState(false)

    const [ error, setError ] = useState('')
    const [ isPending, setIsPending ] = useState(false)

    const { dispatch } = useAuthContext()
    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            const response = await projectAuth.createUserWithEmailAndPassword(email, password)

            if(!response) {
                throw new Error('Could not complete signup')
            }

            await response.user.updateProfile({displayName})

            await projectFirestore.collection('users').doc(response.user.uid).set({
                displayName,
                email,
                online:true,
                uid: response.user.uid
            })
            const name = projectFirestore.collection('users').doc(response.user.uid).get('email')
            console.log(`Email ${name}`);
            dispatch({type: 'LOGIN', payload: response.user})
            
            if(!isCancelled){
                setError(null)
                setIsPending(false)
            }


        } catch (error) {
            setError(error.message)
            setIsPending(false)
        }

       
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    
    return { signup, error, isPending }
}
import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {

    const [ isCancelled, setIsCancelled ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ isPending, setIsPending ] = useState(false)

    const {user, dispatch } = useAuthContext()
    const logout = async () => {

        try {


            await projectAuth.signOut()

            await projectFirestore.collection('users').doc(user.uid).update({
                online: false
            })

            dispatch({type: 'LOGOUT'})
            if(!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch (error) {
            if(!isCancelled){
                setIsPending(false)
                setError(error.message)
            }
        }

        
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending}
        
}
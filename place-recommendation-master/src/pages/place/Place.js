import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { projectAuth, projectFirestore } from "../../firebase/config"

import ChatRoom from '../chatroom/ChatRoom'
import "./Place.css"
import { useUploadBlog } from '../../hooks/useUploadBlogs'
import Blog from '../../components/Blog'
import { useBlogs } from '../../hooks/useBlogs'

export default function Place(props) {
  
 const location = useLocation()
 const navigate = useNavigate()
 //const { uploadBlog, error, isPending, fetchBlog, blogs } = useUploadBlog()
 const [ isPending, setIsPending ] = useState(false)
 const [error, setError] = useState('')
 const [blogs, setBlogs] = useState([])
 //var b = [] 
  
 const place = location.state
 const { documents, e } = useBlogs(place.Name)
 
  
const allBlogs = []
  
//  const fetchBlog = async () => {
//   setIsPending(true)
//   try{
//       await projectFirestore.collection(place.Name)
//       .onSnapshot((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//               if(doc) {
//                   allBlogs.push(doc.data())
//               //console.log(doc.data());
//               }
//           })  
//       })
//       setBlogs(allBlogs)
//       //console.log(allBlogs);
 
//   }catch(err){
//       setError(err)
//   }
  
//   setIsPending(false)
  
//  } 
  console.log(documents);  
  
  

 const goToChatRoom = () => {
    navigate("/chatroom", {
      state:place
    })
 }
 const goToAddBlog = () => {
  navigate("/addblog", {
    state:place
  })
}

  return (
    <div className="place">
        {/* <div className="place-name">{place.Name}</div> */}
       
      <div className="place-container">
        <img src={place.Image} className="image" alt="Place image" />
      
        <div className="left">
          <div className="place-name">{place.Name}</div>
          <div className="description">{place.Description}
          
        </div>
          
        </div>
        
      </div>
      <div className="bottom">
        <div className="showBlog">
          {documents.map((i) => <Blog blog={i}> </Blog>)}
        </div>

      <div className="details">
        <div className="place-name">Address:</div>
            <div className="place-name">{place.Address}</div>  
            <div className="buttons">

                <button className="btn" onClick={() => goToChatRoom()}>Chat Room</button>
                <button className="btn" onClick={() => goToAddBlog()}>Add Eperience</button>
            
            </div>
      </div>
      </div>
    </div>
      
      
      
    
  )
}

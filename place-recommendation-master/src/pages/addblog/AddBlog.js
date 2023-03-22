import React, { useState } from 'react'
import { useLocation } from 'react-router'
import './AddBlog.css'
import { projectStorage } from "../../firebase/config"
import { useUploadBlog } from '../../hooks/useUploadBlogs'


export default function AddBlog() {

  const location = useLocation()
  const place = location.state

  const [date, setDate ] = useState(new Date())
  const [blogText, setBlogText] = useState('') 
  const [err, setErr] = useState('')
  const [ pending, setPending] = useState(false)

  const {uploadBlog, error, isPending } = useUploadBlog()
  const [imgUrls, setImgUrls] = useState([])

  const [files, setFiles] = useState([])

  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
   // add an "id" property to each File object
      setFiles(prevState => [...prevState, newFile]);
    }

  }
  
  const onUploadSubmission = (e) => {
    e.preventDefault()
    setPending(true)
    files.forEach(f => {
      const uploadTask = projectStorage.ref(`/images/${f.name}`).put(f)
      //initiates the firebase side uploading 
      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
        setErr(err.message)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        projectStorage.ref('images').child(f.name).getDownloadURL()
         .then(fireBaseUrl => {
           setImgUrls(prevObject => [...prevObject, fireBaseUrl])
         })
      })
    })
    setPending(false)
    
  }
  console.log(imgUrls);

  const getBlogReady = (e) => {
    e.preventDefault()
    const blog = {
      placeName : place.Name,
      date,
      blogText,
      imgUrls
    }
    console.log(blog);
    uploadBlog(place.Name, blog)
  }
  
  return (
    <div className="addblog">
      <form className="add">
        <h2 className="title">{place.Name.toUpperCase()} </h2>
          <div className="header">
            <div>
            <label>Place Name</label>
            <input type="text" value={place.Name}/>
            </div>
            <div>
            <label>Date at you visited</label>
            <input type="date"/>
            </div>
          </div>
          <input type="file" multiple onChange={onFileChange} className="button" />

            {!pending && <div className="images">
              
               {imgUrls.map((url) => (
                 <img className="img" src={url}/>
               ))}
            </div>}
            {pending && <div>Uploading... </div>}
            <button className="btn" onClick={(e) => onUploadSubmission(e)}>Upload</button>
            <textarea 
              className="addtext"
              required
              onChange={(e) => setBlogText(e.target.value)}
              value={blogText}>

            </textarea>
          <button className="btn" onClick={(e) => getBlogReady(e)}>Submit</button>
      </form>
    </div>
  )
}

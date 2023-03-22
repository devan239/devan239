import React from 'react'
import { useLocation } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';
import SimpleImageSlider from "react-simple-image-slider";
import "./SeeBlog.css"
export default function SeeBlog() {

  const location = useLocation()
  const blog = location.state

  

  const date = new Date(blog.date.seconds*1000)
  const vDate = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
  console.log(blog.imgUrls);
  const urls = blog.imgUrls.map((item) => {
    return {url : item}
  })
  console.log(urls);
  return (
    <div className="seeblog">
      <div className="center">
        <div className="top"> 
          <div>Created By</div>
          <div className="sentBy">
            <FaUserCircle/>
            <div>{blog.sentBy}</div>
          </div>
          </div>
          <div className="top"> 
          <div>Visited At</div>
          <div className="visitedAt">
            <div>{vDate}</div>
          </div>
          </div>

      </div>
      <div className="images">
      {blog.imgUrls.map((url) => (
                 <img className="img" src={url}/>
               ))}

      </div>
      <div className="blogText">
        {blog.blogText}
      </div>
    </div>
  )
}

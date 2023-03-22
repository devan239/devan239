import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./PlaceBox.css"

export default function PlaceBox({place}) {
  return (
    <div className="placebox">
        <div className="name">{place.Name}</div>
        <img src={place.Image} alt="" />
        <Link to="/place" state={place} className="read">Read more..</Link>
    </div>
  )
}

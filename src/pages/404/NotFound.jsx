import React from 'react'
import { useTitle } from '../../hooks'
import "./NotFound.css"
export  function NotFound() {
  useTitle("404");
  return (
    <div className='not-found-grid-layout'>
        <img className='not-found-img' src='https://images.unsplash.com/photo-1584824486516-0555a07fc511?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'  alt='not found'
        width="500px" height="100%" />
    </div>
  )
}

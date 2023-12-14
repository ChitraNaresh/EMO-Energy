import React from 'react'
import { Link } from 'react-router-dom'

const Notfound  = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] p-3">
        <img className='w-[200px] h-[200px]' src="https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png"/>
        <p className='font-bold mt-10 text-center'>Page not found. Plase go to <Link to="/" className="text-blue-500 underline text-lg">HOME</Link></p>
    </div>
  )
}

export default Notfound
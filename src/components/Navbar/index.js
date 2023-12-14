import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const [isShowUser, setShowUser] = useState(false);
  const navigate=useNavigate()
  const handleUserIcon=()=>{
    setShowUser(prev=>!prev)
  }
  const handleonBlurUser=()=>{
    setTimeout(()=>{
        setShowUser(prev=>!prev)
    },300)
  }
  const handleLogout=()=>{
    sessionStorage.setItem("user",JSON.stringify({...JSON.parse(sessionStorage.getItem("user")),isSignIn:false}))
    navigate("/signin")
  }
  return (
    <>
      <nav className="bg-slate-200">
        <div className="px-3 shadow-md md:px-[50px] h-[8vh] min-h-40px flex items-center justify-between">
          <h1 className="text-[15px] md:text-2xl font-bold text-green-500 ">EMO.Energy</h1>
          <button onBlur={handleonBlurUser} onClick={handleUserIcon}  className={"hover:bg-green-400 rounded-lg p-1 " + (isShowUser && "bg-green-400")} type="button">
          <FaUserCircle className="text-xl cursor-pointer z-10" />
          </button>
        </div>
      </nav>
      {isShowUser && (
        <div className="absolute top-12 right-3 w-[150px] bg-slate-100 shadow-md rounded-md px-3 py-2">
          <ul>
            <li className="hover:bg-slate-200 p-2 hover:shadow-md text-black cursor-pointer">Profile</li>
            <li className="hover:bg-slate-200 p-2 hover:shadow-md text-black cursor-pointer">About</li>
            <li className="hover:bg-slate-200 p-2 hover:shadow-md text-black cursor-pointer">Settings</li>
            <li onClick={handleLogout} className="hover:bg-slate-200 p-2 hover:shadow-md text-black cursor-pointer">Sign Out</li>
          </ul>
        </div>
      )}
    </>
  );
};

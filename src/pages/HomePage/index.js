import React from "react";
import { Navbar } from "../../components/Navbar";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  console.log(JSON.parse(sessionStorage.getItem("user")));
  const user = JSON.parse(sessionStorage.getItem("user"));

 const isSignInUser=user ? user.isSignIn ? user.isSignIn: undefined : ""

  if (!isSignInUser) {
    return <Navigate to="/signin" replace={true} />;
  }
  return (
    <div className="bg-neutral-100 h-[100vh]">
      <Navbar />
      <div className="h-[90vh] flex items-center justify-center">
      <h1 className="text-[50px] font-bold text-green-500 ">EMO.Enery</h1>
      </div>
    </div>
  );
};

export default HomePage;

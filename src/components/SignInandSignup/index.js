import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoMailOutline } from "react-icons/io5";
import { IoMdKeypad } from "react-icons/io";
import { Link, Navigate, json, useNavigate } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import axios from "axios"

const patternForGmail = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
const patternForPassword =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,10})$/;

const firstNameErr = "*First name is required";
const secondNameErr = "*Second name is required";
const gmailFormatErr = "*Enter correct valid gmail";
const passwordFormatErr =
  "*Password should have a-z, A-Z, 0-9 and characters limit [6,10]";

const initialFormData = {
  firstname: "",
  secondname: "",
  gmail: "",
  password: "",
};

const initialSumitErrors = {
  firstnameErr: "",
  secondnameErr: "",
  gmailErr: "",
  passwordErr: "",
};

const initialBlurErrors = {
  firstname: false,
  secondname: false,
  gmai: false,
  password: false,
};

const loginCredentials = {
  gmailValue: false,
  passwordValue: false,
};

const SignInandSign = ({ type }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(initialFormData);

  const [isPasswordShow, setPasswordShow] = useState(false);

  const [fieldErrors, setFieldErrors] = useState(initialSumitErrors);

  const [blurErrors, setBlurErrors] = useState(initialBlurErrors);

  const [siginErrs, setSignInErr] = useState(loginCredentials);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const { firstname, secondname, gmail, password } = userData;

    let errorsdata = fieldErrors;

    if (type === "signup") {
      if (!firstname) {
        errorsdata = { ...errorsdata, firstnameErr: firstNameErr };
      } else {
        errorsdata = { ...errorsdata, firstnameErr: "" };
      }

      if (!secondname) {
        errorsdata = { ...errorsdata, secondnameErr: secondNameErr };
      } else {
        errorsdata = { ...errorsdata, secondnameErr: "" };
      }
    }

    if (!patternForGmail.test(gmail)) {
      errorsdata = { ...errorsdata, gmailErr: gmailFormatErr };
    } else {
      errorsdata = { ...errorsdata, gmailErr: "" };
    }

    if (!patternForPassword.test(password)) {
      errorsdata = { ...errorsdata, passwordErr: passwordFormatErr };
    } else {
      errorsdata = { ...errorsdata, passwordErr: "" };
    }

    setFieldErrors(errorsdata);

    const { firstnameErr, secondnameErr, gmailErr, passwordErr } = errorsdata;

    if (!firstnameErr && !secondnameErr && !gmailErr && !passwordErr) {
      if (type === "signup") {
      // try{
      //   await axios.post("http://localhost:5002/signup",userData)
      // }catch(error){
      //     console.log(error.message)
      // }

        sessionStorage.setItem(
          "user",
          JSON.stringify({ isSignUp: true, userData })
        );
        navigate("/signin");
      }
      if (type === "signin") {
        const getUserCredentials = JSON.parse(sessionStorage.getItem("user"));

        if (
          !Boolean(getUserCredentials.userData.gmail === userData.gmail) &&
          !Boolean(getUserCredentials.userData.password === userData.password)
        ) {
          return setSignInErr({ gmailValue: true, passwordValue: true });
        }

        if (!(getUserCredentials.userData.gmail === userData.gmail)) {
          return setSignInErr({
            ...siginErrs,
            gmailValue: true,
            passwordValue: false,
          });
        }

        if (!(getUserCredentials.userData.password === userData.password)) {
          return setSignInErr({
            ...siginErrs,
            passwordValue: true,
            gmailValue: false,
          });
        }

        // try{
        //   const {data}=await axios.post("http://localhost:5002/signin",userData)
        // }
        // }catch(error){
        //     console.log(error.message)
        // }

        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...getUserCredentials, isSignIn: true })
        );
        const getUserFinalCredentials = JSON.parse(
          sessionStorage.getItem("user")
        );
        if (getUserFinalCredentials.isSignIn) {
          navigate("/");
        }
      }
    }
  };

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const user = JSON.parse(sessionStorage.getItem("user"));

  const isSignInUser = user ? (user.isSignIn ? user.isSignIn : undefined) : "";

  if (isSignInUser) {
    return <Navigate to="/" replace={true} />;
  }

  const handleBlur = (e) => {
    e.preventDefault()
    if (!e.target.value) {
      setBlurErrors({ ...blurErrors, [e.target.id]: true });
    } else {
      setBlurErrors({ ...blurErrors, [e.target.id]: false });
    }
  };

  const ShowSignInErr = () => {
    let SignInErr = "";

    SignInErr =
      siginErrs.gmailValue && siginErrs.passwordValue
        ? "Email and Password are wrong"
        : siginErrs.gmailValue
        ? "Enter correct gmail"
        : siginErrs.passwordValue
        ? "Enter correct password"
        : "";

    return SignInErr ? (
      <h1 className="bg-red-500 mt-3 text-white text-center rounded-md pt-1.5 h-[40px] w-[100%]">
        {SignInErr}
      </h1>
    ) : (
      ""
    );
  };

  console.log(siginErrs);

  return (
    <div className="max-h-[100vh] overflow-y-hidden overflow-x-hidden">
    <div className="bg-sky-100 h-[100vh] p-2 flex flex-col items-center box-border justify-start">
      <h1 className="uppercase font-semibold text-lg sm:text-[30px]">{type}</h1>
      <div className="mt-5 w-[100%] max-w-[400px] bg-white px-3 rounded-lg shadow-lg">
        {ShowSignInErr()}
        <form className="pb-4 shrink" onSubmit={handleFormSubmit}>
          <div className="md:flex md:gap-2">
          {type === "signup" && (
            <div className="my-1 flex flex-col">
              <CiUser className="relative bottom-[-62px] mr-2 left-3 text-black" />
              <label htmlFor="firstname" className="mb-2 font-semibold">
                First Name
              </label>
              <input
                onChange={handleInput}
                onBlur={handleBlur}
                value={userData.firstname}
                type="text"
                placeholder="Enter First Name"
                id="firstname"
                className={
                  "bg-slate-200 focus:bg-white shadow-sm text-black w-[100%] md:min-[500px]: pl-8 rounded-lg border-2 border-red-500 focus:outline-1 h-10"
                }
              />
              {blurErrors.firstname || fieldErrors.firstnameErr ? (
                <p className="text-red-500 mt-1 text-[14px] font-medium">
                  {firstNameErr}
                </p>
              ) : (
                ""
              )}
            </div>
          )}

          {type === "signup" && (
            <div className="my-1 flex flex-col">
              <CiUser className="relative bottom-[-62px] mr-2 left-3 text-black" />
              <label className="mb-2 font-semibold" htmlFor="secondname">
                Second Name
              </label>
              <input
                onChange={handleInput}
                onBlur={handleBlur}
                value={userData.secondname}
                type="text"
                placeholder="Enter Second Name"
                id="secondname"
                className="bg-slate-200 focus:bg-white shadow-sm text-black w-[100%] md:min-[500px]: pl-8 rounded-lg border-2 border-red-500 focus:outline-1 h-10"
              />
              {blurErrors.secondname || fieldErrors.secondnameErr ? (
                <p className="text-red-500 mt-1 text-[14px] font-medium">
                  {secondNameErr}
                </p>
              ) : (
                ""
              )}
            </div>
          )}
          </div>

          <div className="my-1 flex flex-col">
            <IoMailOutline className="relative bottom-[-62px] mr-2 left-3 text-black" />
            <label className="mb-2 font-semibold" htmlFor="gmail">
              Gmail
            </label>
            <input
              onChange={handleInput}
              onBlur={handleBlur}
              value={userData.gmail}
              type="text"
              placeholder="Enter Gmail"
              id="gmail"
              className="bg-slate-200 focus:bg-white shadow-sm text-black w-[100%] md:min-[500px]: pl-8 rounded-lg border-2 border-red-500 focus:outline-1 h-10"
            />
            {blurErrors.gmail || fieldErrors.gmailErr ? (
              <p className="text-red-500 mt-1 text-[14px] font-medium">
                {gmailFormatErr}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="my-5 flex flex-col">
            <IoMdKeypad className="relative bottom-[-62px] mr-2 left-3 text-black" />

            <label className="mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleInput}
              onBlur={handleBlur}
              value={userData.password}
              type={isPasswordShow ? "text" : "password"}
              placeholder="Enter Password"
              id="password"
              className="bg-slate-200 focus:bg-white shadow-sm text-black w-[100%] md:min-[500px]: pl-8 rounded-lg border-2 border-red-500 focus:outline-1 h-10"
            />

            <button
            onClick={()=>{
              setPasswordShow(pre=>!pre)
            }}
              type="button"
              className="relative top-[-30px] right-[-90%] "
            >
              {isPasswordShow ? <BsFillEyeFill /> : <BsFillEyeSlashFill/>}
            </button>

            {blurErrors.password || fieldErrors.passwordErr ? (
              <p className="text-red-500 mt-1 text-[14px] font-medium">
                {passwordFormatErr}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="shadow-xl w-[100%] sm:w-[50%]  capitalize p-2 px-4 bg-sky-300 rounded-lg text-lg font-semibold"
            >
              {type}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 bg-white p-3 rounded-md shadow-lg">
        {type === "signup" ? (
          <p>
            Already a member{" "}
            <Link
              to="/signin"
              onClick={() => {
                setFieldErrors(initialFormData);
                setFieldErrors(initialSumitErrors);
                setBlurErrors(initialBlurErrors);
              }}
              className="underline capitalize"
            >
              signin here
            </Link>
          </p>
        ) : (
          <p>
            Don't have an account ?{" "}
            <Link
              to="/signup"
              onClick={() => {
                setFieldErrors(initialFormData);
                setFieldErrors(initialSumitErrors);
                setBlurErrors(initialBlurErrors);
              }}
              className="underline capitalize"
            >
              Join us today.
            </Link>
          </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default SignInandSign;

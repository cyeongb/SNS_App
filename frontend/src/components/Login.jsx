import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/login_logo.png";
import { useState, useEffect } from "react";

const Login = () => {
  console.log("login()");

  const responseGoogle = async (response) => {
    console.log("responseGoogle");
    console.log(response);
    await localStorage.setItem("user", JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    // user 스키마와 동일한 document 임
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    console.log("response.profileObj", response.profileObj);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen ">
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover "
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
        <div className="flex flex-col absolute justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-7 relative">
            <img src={logo} alt="logo" width="auto" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-indigo-900 opacity-90 text-white flex justify-center items-center p-4 rounded-lg cursor-pointer outline-none hover:bg-indigo-800 ease-in duration-300"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" />
                  Google 계정으로 로그인
                </button>
              )}
              onSucess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

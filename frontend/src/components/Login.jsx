import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/login_logo.png";
import { useState, useEffect } from "react";

import { client } from "../client";

const Login = () => {
  console.log("login()");

  // url 조작할 수 있는 navigate() 선언
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    console.log("responseGoogle");
    console.log("response", response);
    console.log("response.profileObj", response.profileObj);

    await localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj; // 여기서 막힘
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    // client

    // sanity 내장함수- user를 생성함
    client.createIfNotExists(doc).then(() => {
      // navigate('주소',{replace,state})
      // replace true : 해당 주소로 넘어간 후 뒤로가기를 해도 돌아오지 않음.
      // false는 뒤로가기 가능.
      navigate("/", { replace: true });
    });

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
              clientId={`${process.env.REACT_APP_CLIENT_ID}`}
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
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              // isSignedIn={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

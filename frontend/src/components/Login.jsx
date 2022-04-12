import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/login_logo.png";
const Login = () => {

const responseGoogle=(response)=>{
  
}


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
          autoplay="true"
        />
        <div className="flex flex-col absolute justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5 relative">
            <img src={logo} alt="logo" width="auto" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId="" //구글로부터 받아서 넘겨줘야하는 아이디
              render={(props) => (
                <button
                  type="button"
                  className="bg-indigo-900 opacity-90 text-white flex justify-center items-center p-4 rounded-lg cursor-pointer outline-none hover:bg-indigo-800 ease-in duration-300"
                  onClick={props.onClick}
                  disabled={props.disabled}
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

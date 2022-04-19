import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { SideBar, UserProfile } from "../components";
import { client } from "../client";
import { userQuery } from "../utils/data";
import Pins from "./Pins";

import logo from "../assets/gongyou2.png";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState("");

  // userinfo를 새로 생성하기위한 함수, 그래서 만약 user가 localstorage에 남아있으면 clear해 준다.
  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  console.log("userInfo", userInfo);

  useEffect(() => {
    //sanity data 불러오기
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out ">
      <div className="hidden md:flex h-screen flex-initial">
        {/* desk-top 모드일때는 hidden으로 숨겼다가 middle 크기일때 사이드바가 두개로 나뉨 */}
        <SideBar />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => setToggleSidebar(false)}
        />
        <Link to="/">
          <img src={logo} alt="logo" className="w-9" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" className="w-9" />
        </Link>
      </div>
    </div>
  );
};

export default Home;

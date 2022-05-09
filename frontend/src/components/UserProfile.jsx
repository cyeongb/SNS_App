import React, { useState, useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

// 배너로 사용할 랜덤 이미지 가져오는 url
const randomImg =
  "https://source.unsplash.com/1600x900/?nature,animals,wallpapers,current-events";

const activeBtnStyles =
  "bg-purple-500/70 text-white mr-0.5 font-bold p-3 mt-3 rounded-full w-auto outline-none transition-all duration-300 ease-in";
const notActiveBtnStyles =
  "bg-gray-200  text-black mr-0.5 font-bold p-3 mt-3 rounded-full w-auto outline-none transition-all duration-300 ease-in";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [pins, setPins] = useState("");
  const [text, setText] = useState("CREATED");
  const [activeBtn, setActiveBtn] = useState("CREATED");

  const navigate = useNavigate();
  const { userId } = useParams(); // /user-profile/:userId

  //구글 로그아웃 함수
  const logoutGoogle = async (response) => {
    await localStorage
      .clear()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.log("logoutGoogle error >", error));
  };

  useEffect(() => {
    //사용자 정보 가져오기
    const query = userQuery(userId);
    client
      .fetch(query)
      .then((data) => {
        setUser(data);
        console.log("user >>", user);
        // console.log("user image>>", user[0]);
      })
      .catch((err) => {
        console.log("user fetch error >>", err);
      });
  }, [userId]);

  //사용자가 생성, 저장한 게시물 노출 로직
  useEffect(() => {
    if (text === "CREATED") {
      console.log('여기? text>',text)
      console.log('여기? userId>',userId)
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client
        .fetch(createdPinsQuery)
        .then((data) => {
          console.log('created data>>',data)
          setPins(data)})
        .catch((err) => {
          console.log("createdPinsQuery err >", err);
        });
    } else {
      console.log('여기? text>',text)
      const savedPinsQuery = userSavedPinsQuery(userId);

      client
        .fetch(savedPinsQuery)
        .then((data) => {
          console.log('saved data>>',data)
          setPins(data)})
        .catch((err) => {
          console.log("savedPinsQuery err >", err);
        });
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImg}
              alt="배너이미지"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover "
            />
            <img
              src={user[0].image}
              alt="프로필이미지"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user[0].userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user[0]._id && (
                <GoogleLogout
                  clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-gray-400 hover:bg-gray-200/80 p-2 rounded-full cursor-pointer outline-none shadow-md transition-all ease-in duration-300"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      title="로그아웃"
                    >
                      <MdOutlineLogout className="text-black hover:text-purple-500 text-2xl" />
                    </button>
                  )}
                  onLogoutSuccess={logoutGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              )}
            </div>
          </div>

          <div className="text-center mb-7">
            <button
              className={`${
                activeBtn === "CREATED" ? activeBtnStyles : notActiveBtnStyles
              }`}
              type="button"
              onClick={(e) => {
                console.log('e.target.textContent',e.target.textContent)
                setText(e.target.textContent);
                setActiveBtn("CREATED");
              }}
            >
              CREATED
            </button>
            <button
              className={`${
                activeBtn === "SAVED" ? activeBtnStyles : notActiveBtnStyles
              }`}
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("SAVED");
              }}
            >
             SAVED
            </button>
          </div>

          <div className="px-2">
            <MasonryLayout pins={pins} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

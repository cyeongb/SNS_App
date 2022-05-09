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

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [pins, setPins] = useState("");
  const [text, setText] = useState("저장됨");
  const [activeBtn, setActiveBtn] = useState("저장됨");

  const navigate = useNavigate();
  const { userId } = useParams(); // /user-profile/:userId

  useEffect(() => {
    //사용자 정보 가져오기
    const query = userQuery(userId);
    client
      .fetch(query)
      .then((data) => {
        setUser(data);
        console.log("user >>", user);
      })
      .catch((err) => {
        console.log("user fetch error >>", err);
      });
  }, [userId]);

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

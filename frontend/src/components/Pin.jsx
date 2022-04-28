import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  MdDownloadForOffline,
  MdDelete,
  MdSave,
  MdOutlineCheck,
} from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  console.log("save >", save);

  const navigate = useNavigate();

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const userInfo = fetchUser();

  // filter은 return이 []배열임 그래서 length 값으로 return해서
  // not을 두개 붙여줌으로써 length값의 boolean타입을 변수에 넣게 설정.
  //ex) googleId:1 postedBy_id:1,2,3 (id값 예시)
  // 1 , [1,2,3] -> 1===1 -filter-> [1] -length-> 1 ->!1 ->false ->!false ->true

  const alreadySaved = !!save?.filter(
    (item) => item.postedBy._id === userInfo?.googleId
  )?.length;

  // sanity에 게시물 저장하기
  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true);

      client
        .patch(id) //id 보냄
        .setIfMissing({ save: [] }) //초기화
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  return (
    <div className="m-2 ">
      <div
        className="relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        <img
          className="rounded-lg w-full"
          src={urlFor(image).width(250).url()}
          alt="사용자게시물"
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none hover:transition-all duration-300 ease-in "
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  // 이미지detail로 리다이렉트 막기 위해
                >
                  <MdDownloadForOffline />
                </a>
              </div>

              {alreadySaved ? (
                <button type="button" className="bg-purple-500 opacity-60 hover:cursor-default hover:opacity-100 text-white font-bold p-2 text-lg rounded-3xl hover:shadow-md outlined-none hover:transition-all duration-300 ease-in">
                  {save?.length}  <FaHeart />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="bg-red-500 opacity-60 hover:opacity-100 text-white font-bold p-2 text-lg rounded-3xl hover:shadow-md outlined-none hover:transition-all duration-300 ease-in"
                >
                  <FaHeart />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;

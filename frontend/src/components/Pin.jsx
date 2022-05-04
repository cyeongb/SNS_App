import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline, MdDelete } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  console.log("save >", save);
  console.log("image >", image);

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

  //게시물 삭제하기
  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    }).catch(err =>console.log('deletePin error',err))
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
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2  pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  className="bg-white w-9 h-9 rounded-full mb-7 flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none hover:transition-all duration-300 ease-in "
                  href={`${image?.asset?.url}?dl=`}
                  download
                  title="다운받기"
                  onClick={(e) => e.stopPropagation()}
                  // 이미지detail로 리다이렉트 막기 위해
                >
                  <MdDownloadForOffline />
                </a>
              </div>

              {alreadySaved ? (
                <button
                  type="button"
                  title="저장됨"
                  className="bg-purple-400  opacity-60 hover:cursor-default hover:opacity-100 text-white font-bold p-2 py-3 text-lg rounded-3xl hover:shadow-md outlined-none hover:transition-all duration-300 ease-in"
                >
                  {save?.length} <FaHeart />
                </button>
              ) : (
                <button
                  type="button"
                  title="저장하기"
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

            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  title="출처"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md"
                >
                  <IoMdShareAlt />
                  {destination.length > 20
                    ? destination.slice(8, 25)
                    : destination.slice(8)}
                </a>
              )}

              {postedBy?._id === userInfo.googleId && (
                <button
                  type="button"
                  title="삭제하기"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-red-400  opacity-60 hover:cursor-default hover:opacity-100 text-white font-bold p-2 py-2 text-lg rounded-3xl hover:shadow-md outlined-none hover:transition-all duration-300 ease-in"
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <Link
        to={`user-profile/${userInfo?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="사용자프로필"
          title={postedBy?.userName}
        />
        <p className="font-semibold text-sm">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;

import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";

import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState("");
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addComment, setAddComment] = useState(false);

  // 특정 id에 접근하기 - 특정 parameter를 useParams로 fetch해 와서 사용할 수 있음
  const { pinId } = useParams();
  console.log('pinId >>',pinId)

  //게시물 상세 데이터 가져오기
  const fetchPinDetail = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        // console.log("pinDetail>>", pinDetail);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  //댓글 달기
  const addingComment = () => {
    console.log("addingComment() comment", comment);
    if (comment) {
      setAddComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetail();
          setComment("");
          setAddComment(false);
        });
    }
  };

  useEffect(() => {
    fetchPinDetail();
  }, [pinId]);

  if (!pinDetail) {
    return <Spinner />;
  }

  return (
    <>
      <div
        className="flex xl-flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={pinDetail?.image && urlFor(pinDetail?.image).url()}
            alt="업로드한_게시물_이미지"
            className="rounded-t-3xl rounded-b-lg"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.image.asset.url}?dl=`}
                className="bg-white hover:shadow-lg hover:bg-slate-100/60 w-11 h-11 rounded-full mb-7 flex items-center justify-center text-dark text-3xl opacity-75 hover:opacity-100 outline-none hover:transition-all duration-300 ease-in"
                download
                onClick={(e) => e.stopPropagation()}
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a
              href={pinDetail.destination}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 w-auto flex items-center gap-2 underline hover:text-black"
            >
              {pinDetail.destination.slice(0, 20)}
              <IoMdShareAlt />
            </a>
          </div>
          <div>
            <h1 className="text-3xl font-bold break-words mt-3 text-gray-600">
              {pinDetail.title}
            </h1>
            <p className="mt-3 font-semibold text-gray-600">
              {pinDetail.about}
            </p>
          </div>
          <Link
            to={`user-profile/${pinDetail.postedBy?._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              className="w-8 h-8 rounded-full"
              src={pinDetail.postedBy?.image}
              alt="사용자프로필"
              title={pinDetail.postedBy?.userName}
            />
            <p className="font-semibold text-sm">
              {pinDetail.postedBy?.userName}
            </p>
          </Link>
          <hr  className="mt-10 text-red-300 border-gray-100" />
          <h2 className="mt-5 text-xl font-bold">댓글</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={"comment" + i}
              >
                <img
                  src={comment.postedBy.image}
                  alt="사용자프로필"
                  className="w-10 h-10 rounded-full cursor-pointer "
                />
                <div className="flex flex-col ">
                  <p className="font-bold">{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link
              to={`user-profile/${pinDetail.postedBy?._id}`}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg"
            >
              <img
                className="w-9 h-9 rounded-full cursor-pointer mb-4"
                src={pinDetail.postedBy?.image}
                alt="사용자프로필"
                title={pinDetail.postedBy?.userName}
              />
            </Link>
            <input
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="댓글 남기기"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-purple-500/70 hover:bg-purple-600/70 text-white rounded-2xl px-4 font-semibold text-base outline-none transition-all duration-300 ease-in"
              onClick={addingComment}
            >
              {addComment ? "댓글남기기" : "저장"}
            </button>
          </div>
        </div>
      </div>
      {/* {console.log("pins>>", pins)} */}
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            추천 공유글 더보기
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <>
          <h2 className="text-gray-400 text-center font-bold text-2xl mt-8 mb-4">
            추천할만한 공유글이 없습니다.
          </h2>
        </>
      )}
    </>
  );
};

export default PinDetail;

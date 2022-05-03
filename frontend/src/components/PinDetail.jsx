import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
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
  // console.log('pinId>>',pinId)  //가져옴

  //게시물 상세 데이터 가져오기
  const fetchPinDetail = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        console.log('pinDetail>>',pinDetail);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
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
              className="bg-white w-9 h-9 rounded-full mb-7 flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none hover:transition-all duration-300 ease-in"
              download
              onClick={(e) => e.stopPropagation()}
            >
              <MdDownloadForOffline />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;

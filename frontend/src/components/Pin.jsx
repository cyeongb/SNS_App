import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline, MdDelete } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { client, urlFor } from "../client";

const Pin = ({ pin: { postedBy, image, _id, destination } }) => {
  // console.log("postedBy>", postedBy);
  console.log("image >", image);
  // console.log("_id >", _id);
  // console.log("destination >", destination);
  const navigate = useNavigate();

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  // console.log("postHovered>", postHovered);

  return (
    <div className="m-2 ">
      <div
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
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
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none transition-all duration-300 ease-in "
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  // 이미지detail로 리다이렉트 막기 위해
                >
                  <MdDownloadForOffline />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;

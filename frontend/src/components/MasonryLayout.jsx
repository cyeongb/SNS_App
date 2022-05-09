import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

// 게시물들을 masonryLayout으로 정렬

//화면 크기별 게시물 갯수 설정
const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  console.log("MasonryLayout pins >>>", pins);

  return (
    <Masonry className="flex animate-slide-fwd" breakpointcols={breakPointObj}>
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;

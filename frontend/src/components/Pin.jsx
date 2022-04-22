import React from "react";
import { urlFor } from "../client";

const Pin = ({ pin: { postedBy, image, _id, destination } }) => {
  console.log("postedBy>", postedBy);
  console.log("image >", image);
  console.log("_id >", _id);
  console.log("destination >", destination);
  return (
    <div>
      <img
        className="rounded-lg w-full"
        src={urlFor(image).width(250).url()}
        alt="사용자게시물"
      />
    </div>
  );
};

export default Pin;

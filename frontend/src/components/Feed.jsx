import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { searchQuery, feedQuery } from "../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState("");

  const { categoryId } = useParams(); // url 파라미터값을 여기에 저장한다.

  useEffect(() => {
    // console.log("categoryId::", categoryId);
    setLoading(true);
    if (categoryId) {
      // categoryId(=searchTerm) 로 각 게시물 데이터를 불러온다.
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data); //게시물 set
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data); // 게시물 set
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) return <Spinner />;

  if (!pins?.length) {
    return <h2 className="text-gray-500 font-bold text-center">게시물이 없습니다.</h2>;
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;

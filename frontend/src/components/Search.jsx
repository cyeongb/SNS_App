import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm);
      client
        .fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("searchQuery error >", err);
        });
    } else {
      client
        .fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("feedQuery error >", err);
        });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner />}
      {pins && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default Search;

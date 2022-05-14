import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [pins, setPins] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      console.log("searchTerm 있음", searchTerm);
      setLoading(true);
      const query = searchQuery(searchTerm);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      console.log("searchTerm 없음", searchTerm);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins.length !== 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default Search;

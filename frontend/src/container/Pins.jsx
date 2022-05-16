import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Search, Feed, CreatePin, PinDetail } from "../components";

const Pins = ({ user }) => {
  //검색어를 다른 컴포넌트에(navbar,search)도 props로 공유하기 위해 pins 컴포넌트에 state 선언.
  const [searchTerm, setSearchTerm] = useState("");



  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;

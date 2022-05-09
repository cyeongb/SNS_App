import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAdd, MdSearch } from "react-icons/md";

// 전 페이지 공통으로 쓰이는 컴포넌트

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  // console.log("navbar- searchTerm:", searchTerm);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <MdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          className="p-2 w-full bg-white outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onFocus={() => navigate("/search")}
        />
      </div>
      <div className="flex gap-3">
        <Link
          to={`user-profile/${user?._id}`}
          className="hidden md:block"
          title="내 프로필"
        >
          <img
            src={user.image}
            alt="사용자프로필"
            className="w-14 h-12 rounded-lg"
          />
        </Link>
        <Link
          to={`create-pin`}
          className="bg-gray-400 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center hover:bg-gray-500 transition-all duration-300 ease-in"
          title="추가하기"
        >
          <MdAdd fontSize={28} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

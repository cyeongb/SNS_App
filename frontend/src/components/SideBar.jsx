import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import logo from "../assets/gongyou2.png";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-400 hover:text-purple transition-all duration-200 ease-in-out capitalize";

const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-purple  transition-all duration-200 ease-in-out capitalize";

const categories = [
  { name: "daily" }, //일상 daily
  { name: "cafe" }, //카페 cafe
  { name: "trip" }, //여행 trips
  { name: "study" }, //스터디 study
  { name: "food" }, //맛집 food
  { name: "pet" }, //강아지,고양이 pet
  { name: "others" }, //기타 others
];

const SideBar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar ">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="공유 로고" className="w-10" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">카테고리</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* user 체크 user있으면 개인 페이지로 */}
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-4 items-center bg-white rounded-lg shadow-lg mx-3 hover:bg-gray-100 transition-all duration-300 ease-in"
          onClick={handleCloseSidebar}
        >
          <img
            src={user?.image}
            alt="사용자프로필"
            className="w-9 h-9 rounded-full p-1 m-1"
          />
          <p className="text-xs text-gray-500">{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default SideBar;

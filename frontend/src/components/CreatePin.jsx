import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

//categories [{name:'cat',image:'url'}]
const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    console.log("e.target.files[0] >", e.target.files[0]);

    if (
      // 사진 타입을 만족하면 wrongtype을 false로
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/png" ||
      type === "image/gif" ||
      type === "image/jpeg"
    ) {
      setWrongImageType(false);
      setLoading(true);

      // upload('asset type','body','options')
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          console.log("imageAsset >", imageAsset);
          setLoading(false);
        })
        .catch((error) => {
          console.log("이미지 업로드 에러", error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 ">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-200 ease-in">
          빈 항목을 채워주세요
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dashed border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>잘못된 이미지입니다.</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-gray-500 font-bold text-5xl">
                      <AiOutlineCloudUpload className="hover:cursor-pointer hover:text-purple-700 transition-all duration-300 ease-in" />
                    </p>
                    <p className="text-md hover:cursor-pointer hover:text-gray-500 transition-all duration-300 ease-in">
                      클릭해서 업로드
                    </p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    &#8251; 업로드는 jpg, jpeg, svg, png, gif 그리고 20mb이하만
                    가능합니다. &#8251;
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="업로드파일"
                  className="h-auto w-auto min-w-300 min-h-300"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white hover:bg-red-400 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in"
                  onClick={() => setImageAsset(null)}
                  title="삭제하기"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            className="outline-none text-xl sm:text-2xl font-bold border-b-2 border-gray-200 p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img
                src={user.image}
                alt="프로필이미지"
                className="w-9 h-9 rounded-full"
              />
              <p className="font-bold text-gray-500">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="내용"
          />
          <input
            type="text"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="페이지 링크"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">
                카테고리 선택
              </p>
              <select
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 rounded-md cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="other" className="bg-white">선택하기</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;

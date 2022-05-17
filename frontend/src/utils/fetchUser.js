// 사용자 정보 가져오기

export const fetchUser =()=>{
  const userInfo =
  localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();

      return userInfo;
}
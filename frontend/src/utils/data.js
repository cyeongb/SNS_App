// fetching sanity data

//사용자 데이터 불러오는 쿼리 함수
export const userQuery = (userId) => {
  const query = `*[_type =="user" && _id == '${userId}']`;

  return query;
};

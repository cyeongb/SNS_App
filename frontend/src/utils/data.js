// fetching sanity data

//사용자 데이터 불러오는 쿼리 함수
export const userQuery = (userId) => {
  const query = `*[_type =="user" && _id == '${userId}']`;

  return query;
};

//게시물 검색에 사용하는 검색 쿼리

//categoryId로 검색
export const searchQuery = (searchTerm) => {
  const query = `*[_type =="pin" && title match '${searchTerm}*' || category match '${searchTerm}*'|| about match '${searchTerm}*']{
    image{
      assets ->{
        url
      } 
    },
    _id,
    destination,
    postedBy ->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

// pin 게시물을 가져와서 생성일 기준 내림차순 정렬 검색
export const feedQuery = `*[_type=='pin'] | order(_createAt desc){
  image{
    assets ->{
      url
    } 
  },
  _id,
  destination,
  postedBy ->{
    _id,
    userName,
    image
  },
  save[]{
    _key,
    postedBy->{
      _id,
      userName,
      image
    },
  },
}`;

// fetching sanity data

export const categories = [
  {
    name: "food",
    image:
      // 치킨
      "https://i.pinimg.com/564x/a5/c7/7f/a5c77fc0289c6712c4b485a3772ae18c.jpg",
  },
  {
    name: "pet",
    image:
      "https://i.pinimg.com/564x/f5/87/e8/f587e89e7f6b0017b0110372528ec0e2.jpg",
  },
  {
    name: "study",
    image:
      "https://i.pinimg.com/564x/5e/2b/a6/5e2ba6045aa43f4588ca400ad469d715.jpg",
  },
  {
    name: "trip",
    image:
      "https://i.pinimg.com/564x/d6/e2/31/d6e231ad2e5653a5a3b350662642e9b4.jpg",
  },
  {
    name: "universe",
    image:
      "https://i.pinimg.com/736x/5a/3f/13/5a3f13984fd41a54d5fa99222f342219.jpg",
  },
  {
    name: "kpop",
    image:
      "https://i.pinimg.com/564x/b8/8c/d1/b88cd1b971bbe8abbdacddde55d3ae7b.jpg",
  },
  {
    name: "fashion",
    image:
      "https://i.pinimg.com/736x/42/f8/65/42f8651157094debfacc2f29f1aa12b9.jpg",
  },
  {
    name: "mind",
    image:
      "https://i.pinimg.com/736x/24/1b/f2/241bf2b9499b5a4dd8232a3835aaf79e.jpg",
  },
  {
    name: "cafe",
    image:
      "https://i.pinimg.com/564x/f5/8e/c2/f58ec2d7d6803eefb311551ed1b18f43.jpg",
  },
];

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
export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
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
    } `;

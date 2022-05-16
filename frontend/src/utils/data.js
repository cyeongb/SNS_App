// fetching sanity data

export const categories = [
  {
    name: "음식",
    id: "food",
    image:
      // 치킨
      "./assets/food.png",
  },
  {
    name: "동물",
    id: "pet",
    image:
      "https://i.pinimg.com/564x/f5/87/e8/f587e89e7f6b0017b0110372528ec0e2.jpg",
  },
  {
    name: "스터디",
    id: "study",
    image:
      "https://i.pinimg.com/564x/5e/2b/a6/5e2ba6045aa43f4588ca400ad469d715.jpg",
  },
  {
    name: "여행",
    id: "trip",
    image:
      "https://i.pinimg.com/564x/d6/e2/31/d6e231ad2e5653a5a3b350662642e9b4.jpg",
  },
  {
    name: "음악",
    id: "music",
    image:
      "https://i.pinimg.com/564x/b8/8c/d1/b88cd1b971bbe8abbdacddde55d3ae7b.jpg",
  },
  {
    name: "패션",
    id: "fashion",
    image:
      "https://i.pinimg.com/736x/42/f8/65/42f8651157094debfacc2f29f1aa12b9.jpg",
  },
  {
    name: "일상",
    id: "daily",
    image:
      "https://i.pinimg.com/736x/24/1b/f2/241bf2b9499b5a4dd8232a3835aaf79e.jpg",
  },
  {
    name: "카페",
    id: "cafe",
    image:
      "https://i.pinimg.com/564x/f5/8e/c2/f58ec2d7d6803eefb311551ed1b18f43.jpg",
  },
  {
    name: "기타",
    image:
      "https://i.pinimg.com/736x/5a/3f/13/5a3f13984fd41a54d5fa99222f342219.jpg",
  },
];

//사용자 데이터 불러오는  **사용자 쿼리 
export const userQuery = (userId) => {
  const query = `*[_type =="user" && _id == '${userId}']`;

  return query;
};

//게시물 검색에 사용하는 검색 쿼리

//categoryId로 검색하는  **검색쿼리
export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
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
          }`;
  return query;
};

// pin 게시물을 가져와서 생성일 기준 내림차순 정렬 검색 **게시물 나열 쿼리
export const feedQuery = `*[_type == "pin"] | order(_createdAt desc){
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
    }`;

// **게시물 상세 쿼리
export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
        image{
          asset->{
            url
          }
        },
        _id,
        title, 
        about,
        category,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
       save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
        comments[]{
          comment,
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        }
      }`;
  return query;
};

//게시물이 존재할때 **게시물 상세 쿼리
export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
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
      }`;
  return query;
};

// 
export const userCreatedPinsQuery = (userId) => {
  const query = `*[_type == "pin" && useId == '${userId}'] | order(_createdAt desc){
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
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == "pin" && '${userId}' in save[].useId ] | order(_createdAt desc) {
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
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

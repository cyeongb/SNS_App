
export default {
  name: "pin",
  title: "Pin",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "about",
      title: "About",
      type: "string",
    },
    {
      name: "destination",
      title: "Destination",
      type: "url",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      //hotspot :이미지에 텍스트, 이미지, 링크등이 포함된 아이콘 '대화형 이미지'
    },
    {
      // 사용자
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      // 게시자
      name: "postedBy",
      title: "PostedBy",
      type: "postedBy",
    },
    {
      // 저장
      name: "save",
      title: "Save",
      type: "array",
      of: [{ type: "save" }],
    },
    {
      // 댓글
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "comment" }],
    },
  ],
};

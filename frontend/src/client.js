import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// sanity의 client data
export const client = sanityClient({
  // credential한 환경변수 사용
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-04-15",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN_EDITOR,
  // ignoreBrowserTokenWarning: true,
});

//sanity에서 제공하는 imageUrlBuilder
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
// export const urlFor = (source) => {
//   builder.image(source);
// };

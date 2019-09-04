import axios from "axios";

const KEY =
  "Client-ID 233030422169e9b025d0bb954e7410ae625bc24aa8b8cd4fb067aea652d01f66";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: KEY
  }
});

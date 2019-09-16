import axios from "axios";
//baseURL: "https://ecommerce-api.cfapps.io/api"
//baseURL: "http://localhost:8080/api"
export default axios.create({
  baseURL: "https://ecommerce-api.cfapps.io/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

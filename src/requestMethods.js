import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// const BASE_URL = "http://localhost:8080/api/";
const BASE_URL = "https://optima-inventory.herokuapp.com/api/";
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUYXJhIiwicm9sZXMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImlzcyI6Imh0dHBzOi8vb3B0aW1hLWludmVudG9yeS1iYWNrZW5kLmhlcm9rdWFwcC5jb20vYXBpL2xvZ2luIiwiZXhwIjoxNjY3NTQ4OTYyfQ.jz2c2exNBzhDPImuCl1hEDJ7lfRzOgOMzJEoWfh-XtY";

// const user = useSelector((state) => state.user.token);
// const TOKEN = JSON.parse(
//   JSON.parse(localStorage.getItem("persist:root")).user
// ).token;
// console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "origin-list"
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
    "Access-Control-Allow-Origin": "origin-list"
  },
});

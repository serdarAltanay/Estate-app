import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // Allow credentials
});

export default apiRequest;
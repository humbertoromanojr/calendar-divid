import axios from "axios";

const api = axios.create({
  baseURL: "https://testapi.io/api/lucaswx2"
});

export default api;
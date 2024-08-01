import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";


const client = axios.create({baseURL: "http://localhost:8080"})

export default client;

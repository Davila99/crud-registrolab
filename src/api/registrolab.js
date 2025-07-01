import axios from "axios";

const registroLabApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/registro/"
});
export const getRegistros = () => registroLabApi.get();
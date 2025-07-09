import axios from "axios";

const registroLabApi = axios.create({
  baseURL: "https://davila.pythonanywhere.com/api/registro/"
});
export const getRegistros = () => registroLabApi.get();
import axios from "axios";

const registroLabApi = axios.create({
  baseURL: "https://davila.pythonanywhere.com/api/registro/"
});
export const getRegistros = () => registroLabApi.get();

const activityApi = axios.create({
  baseURL: "https://uraccan.pythonanywhere.com/api/activitie/eventos-soporte/"
});

export const getActivities = () => activityApi.get();
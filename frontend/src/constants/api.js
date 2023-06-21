import axios from "axios";

//need to change
const API = axios.create({
    url: "/api",
});

export const APIUpdateProfile = (user) => API.post(`/updateUser`, user);
export const APILogIn = (token) => API.get(`/auth`, token);
export const APIMessage = () => API.get(`/message`);
export const APIRate = (rating) => API.post(`/rate`, rating);
export const APISell = (item) => API.post(`/sell`, item);
export const APIBuy = (userEmail, itemId) =>
    API.post(`/buy`, userEmail, itemId);
export const APIUpdateItem = (item) => API.post(`/updateItem`, item);
export const APIGetItems = (text) => API.get(`/items`, text); //get all items if text is empty
export const APIProfile = (userEmail) => API.get(`/profile`, userEmail);

import axios from "axios";

//need to change
const API = axios.create({
    baseURL: "https://localhost:5000",
});

export const APIUpdateProfile = (user) => API.post(`/api/uupdateProfile`, user);
// when user logs in, return user object that contains usr's info
// store this info in storage to be used when profile page is accessed
export const APILogIn = (formData) =>
    API.get(`/api/login/${formData.email}/${formData.password}`);
export const APIMessage = () => API.get(`api/message`);
export const APIRate = () => API.get(`api/rate`);

export const APISell = (item) => API.post(`/api/sell`, item);
export const APIBuy = (itemId) => API.post(`/api/buy`, itemId);
export const APIUpdateItem = (item) => API.post(`/api/updateItem`, item);
export const APIGetItems = (text) => API.get(`api/getItems`, text); //get all items if text is empty
export const APIGetListedItems = (userId) =>
    API.get(`api/getListedItems`, userId);

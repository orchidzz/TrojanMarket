import axios from "axios";
import { store } from "../constants/store";
store.subscribe(listener);

const API = axios.create({
    baseURL: `${window.location.origin}/api`,
});
function listener() {
    let token = store.getState().authReducer.token;
    API.defaults.headers.common["Authorization"] = token;
}

export const APIUpdateProfile = (user) => API.post(`/updateUser`, user);
export const APIRate = (ratingObj) => API.post(`/rate`, ratingObj);
export const APISell = (item) => API.post(`/sell`, item);
export const APIBuy = (userEmail, itemId) =>
    API.post(`/buy`, userEmail, itemId);
export const APIUpdateItem = (item) => API.post(`/updateItem`, item);
export const APIGetItems = (text = "") =>
    API.get(`/items`, { params: { text: text } }); //get all items if text is empty
export const APIProfile = () => API.get(`/profile`);
export const APIMessage = (messageObj) => API.post(`/message`, messageObj);
export const APISeller = (sellerEmail) =>
    API.get(`/seller`, { params: { sellerEmail: sellerEmail } });

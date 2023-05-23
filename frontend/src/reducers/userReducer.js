import { LOGIN, UPDATE_PROFILE, MESSAGE, RATE } from "../constants/actiontypes";

// need to change

const userReducer = (state = null, action) => {
    switch (action.type) {
        case LOGIN:
            return [...posts, action.payload];
        case UPDATE_PROFILE:
            const name = JSON.parse(localStorage.getItem("userName"));
            localStorage.setItem(
                "userName",
                JSON.stringify({ ...user, displayName: action.data })
            );
            return action.payload;
        case MESSAGE:
            return state;
        case RATE:
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;

import {
    AUTHENTICATED,
    NOT_AUTHENTICATED,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    MESSAGE,
    RATE,
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    SELL,
    SELL_SUCCESS,
    SELL_FAILURE,
    UPDATE_ITEM,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
} from "../constants/actiontypes";
import { initialUserState, initialAuthState } from "../constants/initialStates";

export const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                userEmail: action.payload.userEmail,
            };
        case NOT_AUTHENTICATED:
            return state;
        default:
            return state;
    }
};

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case SELL:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SELL_SUCCESS:
            return {
                ...state,
                loading: false,
                listedItems: [...state.listedItems, action.payload],
            };
        case SELL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_ITEM:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_ITEM_SUCCESS:
            // delete old item and add updated item
            return {
                ...state,
                loading: false,
                listedItems: [
                    ...state.listedItems.filter(
                        (item) => item.itemId !== action.payload.itemId
                    ),
                    action.payload,
                ],
            };
        case UPDATE_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                userEmail: action.payload.userEmail,
                userName: action.payload.userName,
                userImg: action.payload.userImg,
            };
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_PROFILE:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                userEmail: action.payload.userEmail,
                userName: action.payload.userName,
                userImg: action.payload.userImg,
                listedItems: action.payload.listedItems,
            };
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

// export const updateProfileReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case UPDATE_PROFILE:
//             return {
//                 loading: true,
//                 error: null,
//             };
//         case UPDATE_PROFILE_SUCCESS:
//             return {
//                 loading: false,
//                 userEmail: action.payload.userEmail,
//                 userName: action.payload.userName,
//                 userImg: action.payload.userImg,
//             };
//         case UPDATE_PROFILE_FAILURE:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };
// export const getProfileReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_PROFILE:
//             return {
//                 loading: true,
//                 error: null,
//             };
//         case GET_PROFILE_SUCCESS:
//             return {
//                 loading: false,
//                 userEmail: action.payload.userEmail,
//                 userName: action.payload.userName,
//                 userImg: action.payload.userImg,
//                 listedItems: action.payload.listedItems,
//             };
//         case GET_PROFILE_FAILURE:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };

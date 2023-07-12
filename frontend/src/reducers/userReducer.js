import {
    AUTHENTICATED,
    NOT_AUTHENTICATED,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    MESSAGE,
    MESSAGE_FAILED,
    RATE,
    RATE_FAILED,
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    SELL,
    SELL_SUCCESS,
    SELL_FAILURE,
    UPDATE_ITEM,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    GET_SELLER,
    GET_SELLER_SUCCESS,
    GET_SELLER_FAILURE,
} from "../constants/actiontypes";
import {
    initialUserState,
    initialAuthState,
    initialSellerState,
} from "../constants/initialStates";

export const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                error: null,
                loading: false,
                token: action.payload.token,
                userEmail: action.payload.userEmail,
            };
        case NOT_AUTHENTICATED:
            return { ...initialAuthState, error: action.payload.error };
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
                userEmail: action.payload.sk,
                userName: action.payload.username,
                userImg: action.payload.img,
                listedItems: action.payload.listedItems,
                chats: action.payload.chats,
                responsiveness: action.payload.responsiveness,
                trustworthiness: action.payload.trustworthiness,
                timeliness: action.payload.timeliness,
            };
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case MESSAGE:
            let receiver = action.payload.receiver;
            let new_chats = state.chats;
            if (new_chats[receiver] === undefined) {
                new_chats[receiver] = action.payload;
            } else {
                new_chats[receiver].push(action.payload);
            }
            return {
                ...state,
                loading: false,
                chats: new_chats,
            };
        case MESSAGE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const rateReducer = (
    state = { loading: false, error: null },
    action
) => {
    switch (action.type) {
        case RATE:
            return state;
        case RATE_FAILED:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const sellerReducer = (state = initialSellerState, action) => {
    switch (action.type) {
        case GET_SELLER:
            return state;
        case GET_SELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                sellerEmail: action.payload.sk,
                sellerName: action.payload.username,
                sellerImg: action.payload.img,
                sellerResponsiveness: action.payload.responsiveness,
                sellerTrustworthiness: action.payload.trustworthiness,
                sellerTimeliness: action.payload.timeliness,
            };
        case GET_SELLER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

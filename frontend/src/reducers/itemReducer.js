import {
    BUY,
    BUY_SUCCESS,
    BUY_FAILURE,
    GET_ITEMS,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
} from "../constants/actiontypes";
import { initialItemsState } from "../constants/initialStates";

export const getItemsReducer = (state = initialItemsState, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                items: [],
                loading: true,
                error: null,
            };
        case GET_ITEMS_SUCCESS:
            return {
                error: null,
                loading: false,
                items: action.payload,
            };
        case GET_ITEMS_FAILURE:
            return {
                items: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const buyReducer = (state = initialItemsState, action) => {
    switch (action.type) {
        case BUY:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case BUY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case BUY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

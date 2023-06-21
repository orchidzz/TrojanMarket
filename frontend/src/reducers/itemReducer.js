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
                loading: true,
                error: null,
            };
        case BUY_SUCCESS:
            return {
                loading: false,
                error: null,
            };
        case BUY_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

// export const sellReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SELL:
//             return {
//                 loading: true,
//                 error: null,
//             };
//         case SELL_SUCCESS:
//             return {
//                 loading: false,
//                 listedItems: [...state.listedItems, action.payload],
//             };
//         case SELL_FAILURE:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export const updateItemReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case UPDATE_ITEM:
//             return {
//                 loading: true,
//                 error: null,
//             };
//         case UPDATE_ITEM_SUCCESS:
//             // delete old item and add updated item
//             return {
//                 loading: false,
//                 listedItems: [
//                     ...state.listedItems.filter(
//                         (item) => item.itemId !== action.payload.itemId
//                     ),
//                     action.payload,
//                 ],
//             };
//         case UPDATE_ITEM_FAILURE:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };

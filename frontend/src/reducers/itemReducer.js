import {
    BUY,
    SELL,
    UPDATE_ITEM,
    GET_ITEMS,
    GET_LISTED_ITEMS,
} from "../constants/actiontypes";

const itemReducer = (items = [], action) => {
    switch (action.type) {
        case BUY:
            return [...items, action.payload];
        case SELL:
            return action.payload;
        case UPDATE_ITEM:
            return action.payload;
        case GET_ITEMS:
            return action.payload;
        case GET_LISTED_ITEMS:
            return action.payload;
        default:
            return items;
    }
};

export default itemReducer;

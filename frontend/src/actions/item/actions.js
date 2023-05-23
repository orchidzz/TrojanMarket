import {
    BUY,
    SELL,
    UPDATE_ITEM,
    GET_ITEMS,
    GET_LISTED_ITEMS,
} from "../../constants/actiontypes";

import {
    APIBuy,
    APIGetItems,
    APISell,
    APIUpdateItem,
    APIGetListedItems,
} from "../../constants/api";

export const buyAction = (itemId) => async (dispatch) => {
    try {
        const { data } = await APIBuy(itemId);

        dispatch({ type: BUY, data });
    } catch (error) {
        console.log(error);
    }
};

export const sellAction = (item, navigate) => async (dispatch) => {
    try {
        const { data } = await APISell(item);

        dispatch({ type: SELL, data });

        navigate("/sold");
    } catch (error) {
        console.log(error);
    }
};

export const getItemsAction = (text, navigate) => async (dispatch) => {
    try {
        // get all items if text is empty
        const { data } = await APIGetItems(text);

        dispatch({ type: GET_ITEMS, data });
    } catch (error) {
        console.log(error);
    }
};

export const updateItemsAction = (item, navigate) => async (dispatch) => {
    try {
        // get all items if text is empty
        const { data } = await APIUpdateItem(item);

        dispatch({ type: UPDATE_ITEM, data });

        // to update the view with latest updates
        navigate("/sold");
    } catch (error) {
        console.log(error);
    }
};

export const getListedItemsAction = (navigate) => async (dispatch) => {
    try {
        const { data } = await APIGetListedItems();

        dispatch({ type: GET_LISTED_ITEMS, data });
    } catch (error) {
        console.log(error);
    }
};

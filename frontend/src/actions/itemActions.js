import {
    BUY,
    BUY_SUCCESS,
    BUY_FAILURE,
    SELL,
    SELL_SUCCESS,
    SELL_FAILURE,
    UPDATE_ITEM,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    GET_ITEMS,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
} from "../constants/actiontypes";

import { APIBuy, APIGetItems, APISell, APIUpdateItem } from "../constants/api";

export const buyAction = (userEmail, itemId) => (dispatch) => {
    dispatch({ type: BUY });
    APIBuy(userEmail, itemId)
        .then(() => {
            dispatch({ type: BUY_SUCCESS, payload: itemId });
        })
        .catch((error) => {
            dispatch({ type: BUY_FAILURE, payload: error });
        });
};

export const sellAction = (item) => (dispatch) => {
    dispatch({ type: SELL });
    APISell(item)
        .then(() => {
            dispatch({ type: SELL_SUCCESS, payload: item });
        })
        .catch((error) => {
            dispatch({ type: SELL_FAILURE, payload: error });
        });
};

export const getItemsAction =
    (text = "") =>
    (dispatch) => {
        dispatch({ type: GET_ITEMS });
        // get all items if text is empty
        APIGetItems(text)
            .then((response) => {
                dispatch({ type: GET_ITEMS_SUCCESS, payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: GET_ITEMS_FAILURE, payload: error });
            });
    };

export const updateItemAction = (item) => async (dispatch) => {
    dispatch({ type: UPDATE_ITEM });
    APIUpdateItem(item)
        .then(() => {
            dispatch({ type: UPDATE_ITEM_SUCCESS, payload: item });
        })
        .catch((error) => {
            dispatch({ type: UPDATE_ITEM_FAILURE, payload: error });
        });
};

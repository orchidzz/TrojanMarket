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
    GET_SELLER,
    GET_SELLER_SUCCESS,
    GET_SELLER_FAILURE,
} from "../constants/actiontypes";

import {
    APIUpdateProfile,
    APIMessage,
    APIProfile,
    APIRate,
    APISeller,
} from "../constants/api";

export const messageAction = (receiverEmail, message) => async (dispatch) => {
    const messageObj = {
        receiverEmail: receiverEmail,
        message: message,
    };
    APIMessage(messageObj)
        .then(() => {
            dispatch({
                type: MESSAGE,
                payload: messageObj,
            });
        })
        .catch((error) => {
            dispatch({ type: MESSAGE_FAILED, payload: error });
        });
};

export const rateAction =
    (raterEmail, sellerEmail, responsiveness, trustworthiness, timeliness) =>
    async (dispatch) => {
        const rating = {
            raterEmail: raterEmail,
            sellerEmail: sellerEmail,
            responsiveness: responsiveness,
            trustworthiness: trustworthiness,
            timeliness: timeliness,
        };
        APIRate(rating)
            .then(() => {
                dispatch({
                    type: RATE,
                });
            })
            .catch((error) => {
                dispatch({ type: RATE_FAILED, payload: error });
            });
    };

export const loginAction = (token, userEmail) => async (dispatch) => {
    if (token) {
        dispatch({
            type: AUTHENTICATED,
            payload: { token: token, userEmail: userEmail },
        });
    } else {
        dispatch({
            type: NOT_AUTHENTICATED,
            payload: { error: "Invalid token" },
        });
    }
    // APILogIn(token)
    //     .then((response) => {
    //         dispatch({
    //             type: AUTHENTICATED,
    //             payload: { token: response.data.token, userEmail: userEmail },
    //         });
    //     })
    //     .catch((error) => {
    //         dispatch({ type: NOT_AUTHENTICATED, payload: error });
    //     });
};

export const signoutAction = () => async (dispatch) => {
    dispatch({
        type: NOT_AUTHENTICATED,
    });
};

export const getProfileAction = () => async (dispatch) => {
    dispatch({ type: GET_PROFILE });
    APIProfile()
        .then((response) => {
            dispatch({ type: GET_PROFILE_SUCCESS, payload: response.data });
        })
        .catch((error) => {
            dispatch({ type: GET_PROFILE_FAILURE, payload: error });
        });
};

export const updateProfileAction = (user) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE });
    APIUpdateProfile(user)
        .then(() => {
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: user });
        })
        .catch((error) => {
            dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
        });
};

export const getSellerAction = (sellerEmail) => async (dispatch) => {
    dispatch({ type: GET_SELLER });
    APISeller(sellerEmail)
        .then((response) => {
            dispatch({ type: GET_SELLER_SUCCESS, payload: response.data });
        })
        .catch((error) => {
            dispatch({ type: GET_SELLER_FAILURE, payload: error });
        });
};

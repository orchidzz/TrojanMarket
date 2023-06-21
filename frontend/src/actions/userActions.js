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
} from "../constants/actiontypes";

import {
    APILogIn,
    APIUpdateProfile,
    APIMessage,
    APIProfile,
} from "../constants/api";

export const loginAction = (token, userEmail) => async (dispatch) => {
    APILogIn(token)
        .then((response) => {
            dispatch({
                type: AUTHENTICATED,
                payload: { token: response.data.token, userEmail: userEmail },
            });
        })
        .catch((error) => {
            dispatch({ type: NOT_AUTHENTICATED, payload: error });
        });
};

export const signoutAction = () => async (dispatch) => {
    dispatch({
        type: NOT_AUTHENTICATED,
    });
};

export const getProfileAction = (userEmail) => async (dispatch) => {
    dispatch({ type: GET_PROFILE });
    APIProfile(userEmail)
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

// export const messageAction = (user) => async (dispatch) => {
//     try {
//         const { data } = await APIMessage(user);

//         dispatch({ type: MESSAGE, data });
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const rateAction = (user) => async (dispatch) => {
//     try {
//         const { data } = await APIRa(user);

//         dispatch({ type: UPDATE_PROFILE, data });
//     } catch (error) {
//         console.log(error);
//     }
// };

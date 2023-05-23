import {
    LOGIN,
    UPDATE_PROFILE,
    MESSAGE,
    RATE,
} from "../../constants/actiontypes";

import { APILogIn, APIUpdateProfile, APIMessage } from "../../constants/api";

export const loginAction = () => async (dispatch) => {
    try {
        const { data } = await APILogIn();

        dispatch({ type: LOGIN, data });
    } catch (error) {
        console.log(error);
    }
};

export const updateProfileAction = (user) => async (dispatch) => {
    try {
        const { data } = await APIUpdateProfile(user);

        dispatch({ type: UPDATE_PROFILE, data });
    } catch (error) {
        console.log(error);
    }
};

export const messageAction = (user) => async (dispatch) => {
    try {
        const { data } = await APIMessage(user);

        dispatch({ type: MESSAGE, data });
    } catch (error) {
        console.log(error);
    }
};

// export const rateAction = (user) => async (dispatch) => {
//     try {
//         const { data } = await APIRa(user);

//         dispatch({ type: UPDATE_PROFILE, data });
//     } catch (error) {
//         console.log(error);
//     }
// };

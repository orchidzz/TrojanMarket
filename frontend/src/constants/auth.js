import {
    getAuth,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
} from "firebase/auth";
import { APILogIn } from "./api";
import { useDispatch } from "react-redux";
import { loginAction, signoutAction } from "../actions/userActions";

async function useGoogleLogin() {
    const dispatch = useDispatch();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    getRedirectResult(auth)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log(result);

            // if it is a verified/valid user, send token to server and get new token to include in header
            dispatch(loginAction(token, auth.email));
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage);
        });
}
async function useSignOut() {
    const dispatch = useDispatch();
    const auth = getAuth();
    await auth.signOut();
    dispatch(signoutAction());
}

export { useGoogleLogin, useSignOut };

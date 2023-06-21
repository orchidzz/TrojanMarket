// create token from google authorization to send to frontend for storage
const admin = require("firebase-admin");

async function authorize(token) {
    const serviceAccount = require("./../trojanmarket-firebase.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    // verify token (google access token)
    // generate custom token to send to frontend
    try {
        // verify the Google access token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(token);

        // get the user ID from the decoded token
        const { uid } = decodedToken;
        // generate a custom token that lasts 2 hours
        const expirationTime = Date.now() + 120 * 60000; // 60000 millisec = 1 min
        const customToken = await admin
            .auth()
            .createCustomToken(uid, { expiresIn: expirationTime });

        return customToken;
    } catch (error) {
        console.log("Error verifying token: ", error);
        return null;
    }
}
module.exports = authorize;

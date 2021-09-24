import { VALID_USERS } from '.././userLogins'
import { APP_CONSTANTS } from '.././constants';

/**
 * @description - Verify if the username and password is present in the given users list.
 * @param {string} authUserName
 * @param {string} authUserPassword
 * @returns {string} - Verification status showing Valid or Invalid user.
 */

export function verifyDecodedToken(authUserName: string, authUserPassword: string): string {
    try {
        const validUser = VALID_USERS.users.find(user => user.userLogin === authUserName && user.password === authUserPassword);
        if (validUser && validUser.userLogin && validUser.password) {
            return APP_CONSTANTS.VALID_USER;
        } else {
            return APP_CONSTANTS.INVALID_USER;
        }
    } catch (err) {
        console.log("An error occurred while executing the verify token", err);
        return APP_CONSTANTS.INTERNAL_SERVER_ERROR;
    }
}

/**
 * @description - Decode the authorization header which is in base64 format to ASCII format.
 * @param {string} authorizationHeader
 * @returns {string} - Decoded Authorization token
 */

export function decodeAuthenticationHeader(authorizationHeader: string): string {
    try {
        let authenticationToken;
        authenticationToken = authorizationHeader.replace(/^Basic/, '');
        authenticationToken = Buffer.from(authenticationToken, 'base64').toString('ascii');
        return authenticationToken.includes(":") ? authenticationToken : '';
    } catch (err) {
        console.log("An error occurred while executing the decode token function", err);
        return APP_CONSTANTS.INTERNAL_SERVER_ERROR;
    }
}
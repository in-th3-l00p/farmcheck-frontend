// implementing authentification and authorization utilities
import axios from "axios";
import {NotAuthenticatedError} from "./constants";

/**
 * Stores the JWT using cookies.
 * @param id_token the JWT
 */
export function storeJWT(id_token) {
    document.cookie=`id_token=${id_token};Secure;SameSite=Lax`
}

/**
 * Deletes the JWT cookie.
 */
export function deleteJWT() {
    document.cookie="id_token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

/**
 * Gets the JWT cookie.
 * @returns the JWT cookie if authenticated, or empty string
 * @throws error if not authenticated
 */
export function getJWT() {
    const key = "id_token="
    const cookies = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < cookies.length; i++) {
        while (cookies[i][0] === " ")
            cookies[i].slice(1);
        if (cookies[i].indexOf(key) === 0) 
            return cookies[i].substring(key.length, cookies[i].length);
    }

    throw NotAuthenticatedError;
}

/**
 * Checks if the user is authenticated.
 * @return {boolean} true if authenticated
 */
export function isAuthenticated() {
    try {
        const token = getJWT();
        return true;
    } catch {
        return false;
    }
}

/**
 * Gets the authorization headr if authenticated.
 * @returns the authorization header if authenticated, or an empty object
 * @throws error if not authenticated
 */
export function getAuthorizationHeader() {
    const token = getJWT();
    if (!token)
        throw NotAuthenticatedError;

    return { "Authorization": `Bearer ${token}` };
}

/**
 * Fetches user details if authenticated.
 * @returns the user details
 * @throws error if not authenticated
 */
export async function fetchUserDetails() {
    const response = await axios.get(
        "/api/account", 
        { headers: getAuthorizationHeader() }
    );

    return response.data;
}
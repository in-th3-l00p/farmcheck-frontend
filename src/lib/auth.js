// implementing authentification and authorization utilities
import axios from "axios";

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
    document.cookie="id_token=;expires=Thu, 01 Jan 00:00:00 UTC";
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

    throw new Error("Unauthenticated");
}

/**
 * Gets the authorization headr if authenticated.
 * @returns the authorization header if authenticated, or an empty object
 * @throws error if not authenticated
 */
export function getAuthorizationHeader() {
    const token = getJWT();
    return { "Authorization": `Bearer ${token}` };
}

/**
 * Gets user details if authenticated.
 * @returns the user details
 * @throws error if not authenticated
 */
export async function getUserDetails() {
    const response = await axios.get(
        "/api/account", 
        { headers: getAuthorizationHeader() }
    );

    return response.data;
}
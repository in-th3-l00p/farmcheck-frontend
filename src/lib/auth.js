// implementing authentification and authorization utilities

/**
 * Stores the JWT using cookies.
 * @param id_token the JWT
 */
export function storeJWT(id_token) {
    document.cookie=`id_token=${id_token};Secure;SameSite=Lax`
}

/**
 * Gets the JWT cookie.
 * @returns the JWT cookie if authenticated, or empty string
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

    return "";
}

/**
 * Gets the authorization headr if authenticated.
 * @returns the authorization header if authenticated, or an empty object
 */
export function getAuthorizationHeader() {
    const token = getJWT();
    if (!token)
        return {};
    return { "Authorization": `Bearer ${token}` };
}
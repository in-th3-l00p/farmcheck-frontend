import { useEffect } from "react";
import { deleteJWT, fetchUserDetails } from "../auth";
import { NotAuthenticatedError } from "../constants";

/* 
    the keys used for storing information 
    about the user inside the browser storage.
*/
const authenticatedStateStorageKey = "authenticated";
const detailsStorageKey = "user";

class UserService {
    /**
     * @returns true if the client is authenticated
     */
    isAuthenticated() {
        return sessionStorage.getItem(authenticatedStateStorageKey) === "true";
    }

    /**
     * Gets user details.
     * @returns object containing user details
     * @throws an error if the client is not authenticated
     */
    getUserDetails() {
        if (!this.isAuthenticated())
            throw NotAuthenticatedError;
        return JSON.parse(sessionStorage.getItem(detailsStorageKey))
    }

    /**
     * Logs out the user
     */
    logout() {
        deleteJWT();
        sessionStorage.setItem(authenticatedStateStorageKey, false);
        sessionStorage.removeItem(detailsStorageKey);
    }
}

/**
 * React hook that handles updating user details (by re-fetching) automatically.
 * To be placed inside the main component of the application.
 */
export function useUserDetailsUpdater() {
    useEffect(() => {
        fetchUserDetails()
            .then(data => {
                sessionStorage.setItem(authenticatedStateStorageKey, true);
                sessionStorage.setItem(detailsStorageKey, JSON.stringify(data));
            })
            .catch(() => {
                sessionStorage.setItem(authenticatedStateStorageKey, false);
                sessionStorage.removeItem(detailsStorageKey);
            })

    }, [])
}

// creating the main service (pov java programmer)
const userService = new UserService();

export default userService;
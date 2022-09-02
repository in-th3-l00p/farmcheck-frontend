import { useLayoutEffect, useState } from "react";
import { deleteJWT, fetchUserDetails, getAuthorizationHeader } from "../auth";
import { NetworkError, NotAuthenticatedError, UserNotFound } from "../constants";
import axios from "axios";

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
     * Gets the authenticated user details.
     * @returns object containing user details
     * @throws an error if the client is not authenticated
     */
    getCurrentUserDetails() {
        if (!this.isAuthenticated())
            throw NotAuthenticatedError;
        return JSON.parse(sessionStorage.getItem(detailsStorageKey))
    }

    /**
     * Gets authenticated user's username.
     * @returns object's username
     * @throws an error if the client is not authenticated
     */
    getCurrentUsername() {
        if (!this.isAuthenticated())
            throw NotAuthenticatedError;
        return this.getCurrentUserDetails()["login"];
    }

    /**
     * Logs out the user
     * @throws an error if the client is not authenticated
     */
    logout() {
        if (!this.isAuthenticated())
            throw NotAuthenticatedError;
        deleteJWT();
        sessionStorage.setItem(authenticatedStateStorageKey, false);
        sessionStorage.removeItem(detailsStorageKey);
    }

    /**
     * Gets the details of user using his username
     * @param {*} username the username
     * @returns the details object
     * @throws an error if the client is not authenticated
     */
    async getUserDetails(username) {
        if (!this.isAuthenticated())
            throw NotAuthenticatedError;

        try {
            const response = await axios.get(
                "/api/user", 
                { 
                    headers: getAuthorizationHeader(),
                    params: { "login": username } 
                }
            );

            return response.data;
        } catch (err) {
            if (err.response.status === 500) 
                throw UserNotFound;
            throw NetworkError;
        }
    }
}

/**
 * React hook that handles updating user details (by re-fetching) automatically.
 * To be placed inside the main component of the application.
 * race condition removed <3
 */
export function useUserDetailsUpdater() {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(undefined);

    useLayoutEffect(() => {
        fetchUserDetails()
            .then(data => {
                sessionStorage.setItem(authenticatedStateStorageKey, true);
                sessionStorage.setItem(detailsStorageKey, JSON.stringify(data));
            })
            .catch((err) => {
                console.log(err)
                if (err.code === "ERR_NETWORK") {
                    setError(NetworkError);
                    return;
                }

                sessionStorage.setItem(authenticatedStateStorageKey, false);
                sessionStorage.removeItem(detailsStorageKey);
            })
            .finally(() => {
                setLoaded(true);
            })
    }, [])
    
    return [loaded, error];
}

// creating the main service (pov java programmer)
const userService = new UserService();

export default userService;
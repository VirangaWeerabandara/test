import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const {dispatch} = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://16.171.39.232/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }
        if (response.ok) {
            //save user in local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }

    }

    return { signup, loading, error }
}     
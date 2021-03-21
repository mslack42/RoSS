import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const token = localStorage.getItem("RoSS");
        return token;
    };
    const saveToken = (token : string) => {
        localStorage.setItem("RoSS",token);
        setToken(token);
      };
    const [token, setToken] = useState(getToken());

    return {
        token,
        setToken: saveToken,
    }
}
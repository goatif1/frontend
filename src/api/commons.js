import axios from 'axios';
import { getCookie } from '../utils/cookies';

const API_URL = `http://${process.env.REACT_APP_API_HOST}:3080`;

const getApiUrl = () => {
    return API_URL;
}

const getAuthString = (tokenString) => {
    if (tokenString) return `Bearer ${tokenString}`;
    return `Bearer ${getCookie('token')}`;
}

const getData = async (url, credentials = true, tokenString = null) => {
    try {
        return axios.get(url, {
            headers: {
                Authorization: getAuthString(tokenString)
            },
            withCredentials: credentials
        })
        .then((response) => {return response})
        .catch((error) => {
            console.error(error);
            return null;
        })
    } catch (error) {
        console.error(error);
        return null;
    }
}

export {
    getApiUrl,
    getData
}

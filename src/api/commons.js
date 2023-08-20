import axios from 'axios';
import { getToken } from '../utils/access';

const API_URL = `http://${process.env.REACT_APP_API_HOST}:3080`;

const getApiUrl = () => {
    return API_URL;
}

const getAuthString = (tokenString) => {
    if (tokenString) return `Bearer ${tokenString}`;
    return `Bearer ${getToken('token')}`;
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

const postData = async (url, data, credentials = true, tokenString = null) => {
    try {
        return axios.post(url, data, {
            headers: {
                Authorization: getAuthString(tokenString)
            },
            withCredentials: credentials
        })
    } catch (error) {
        console.error(error);
        return null;
    }
}

export {
    getApiUrl,
    getData,
    postData
}

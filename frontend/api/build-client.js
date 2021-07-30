import axios from 'axios';

export const API_BASE_URI = 'http://localhost:3000';

const client = ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on the server
        return axios.create({
            baseURL: API_BASE_URI,
            headers: req.headers
        });
    } else {
        // we must be on the browser
        return axios.create({
            baseUrl: '/'
        });
    }
}

export default client;
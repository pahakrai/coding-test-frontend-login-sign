import axios from 'axios';

const client = ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on the server
        return axios.create({
            baseURL: process.env.API_BASE_URI,
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
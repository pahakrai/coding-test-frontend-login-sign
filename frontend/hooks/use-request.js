import axios from 'axios';
import { useState } from 'react';


const useRequest = () => {
    const [errors, setErrors] = useState(null);
    const doRequest = async ({ url, method, body, onSuccess }) => {
        try {
            setErrors(null);
            const response = await axios[method](url, body, {
                headers: {
                    'Content-Type': 'application/json'
                  },
                withCredentials: true
            });
            if (onSuccess && response) {
                onSuccess(response.data);
            }
            return response.data;
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops...</h4>
                </div>
            );
        }
    };

    return { doRequest, errors};
};

export default useRequest;
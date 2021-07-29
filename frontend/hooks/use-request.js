import axios from 'axios';
import { useState } from 'react';


const useRequest = ({url, method, body = {}, onSuccess}) => {
    const [errors, setErrors] = useState(null);
    const doRequest = async ({ data }) => {
        try {
            setErrors(null);
            console.log(data, method, body, url)
            const response = await axios[method](url, { ...body, ...data});
            console.log(response);
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
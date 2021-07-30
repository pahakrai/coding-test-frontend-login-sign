import { useState, useEffect } from 'react';
import Web3 from 'web3';

const useWeb3 = () => {
    const [web3, setWeb3] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const init = async () => {
            await getWeb3();
        }
        init();
    }, []);
    
    const getWeb3 = async () => {
        try {
            //Check to see if Metamask is installed
            if (!window.ethereum) {
                throw new Error(
                    "Non-Ethereum browser detected. You should consider trying MetaMask!"
                )
            }
            const web3 = new Web3(Web3.givenProvider)
            setWeb3(web3);
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops Ethereum Not Supported. Please install MetaMask for browser</h4>
                </div>
            );
        };
    };

    return { web3, errors};
};

export default useWeb3;
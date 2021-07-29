import React, { useState } from "react";
import Router from "next/router";

import useRequest from '../../hooks/use-request';
import useWeb3 from '../../hooks/use-web3';

const SignIn = ({nonce}) => {
    const [token, setToken] = useState(null);
    const [errors, setErrors] = useState(null);
    const {doRequest, errors: requestErrors} = useRequest({
        url: 'http://localhost:3000/auth',
        method: 'post',
        onSuccess: () => {
            Router.push('/')
        }
    });
    const {web3, errors: web3errors} = useWeb3();

    const handleSignin = async (event) => {
        event.preventDefault();
        try {    
            setErrors(null);
            //Get an account from Metamask
            const address = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            if (address.length < 0) {
                throw new Error("no address found")
            }
    
            //Signs data to unlock account
            const signature = await web3.eth.personal.sign(
                nonce.toString(),
                address[0]
            )
        
            const data = {
                address: address[0],
                signature,
                nonce,
            }
        
            //Authenticate user and return a token
            const token = await doRequest({data});
            console.log(token);
            setToken(token);
        } catch (error) {
            setErrors(
                <div className="alert alert-danger">
                    <li>Oops...</li>
                </div>
            );
        }
      }

    return (
        <div>
            <p>
				Please login with metamask
			</p>
            <div className="row justify-content-center">
                {!web3errors && <button className="btn btn-primary" onClick={handleSignin}>Sign In</button>}
            </div>            
            {web3errors || requestErrors || errors}
        </div>
    );
}

export default SignIn; 
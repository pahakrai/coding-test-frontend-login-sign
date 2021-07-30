import React, { useState } from "react";
import Router from "next/router";

import useRequest from '../hooks/use-request';
import useWeb3 from '../hooks/use-web3';

import buildClient from '../api/build-client';

const LandingPage = ({currentAddress}) => {
    const [token, setToken] = useState(null);
    const [errors, setErrors] = useState(null);
    const {doRequest, errors: requestErrors} = useRequest();
    const {web3, errors: web3errors} = useWeb3();


    console.log(currentAddress);

    const handleSignin = async (event) => {
        event.preventDefault();
        try {    
            setErrors(null);
            // get metamask account address
            const address = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            if (address.length < 0) {
                throw new Error("no address found")
            }
          
            // NOTE: nonce can be created in common helper package for backend and frontend
            // without making request
            // return nonce
            const nonce = await doRequest({
                url: 'http://localhost:3000/token',
                method: 'get',
                onSuccess: () => {
                    // do whatever required
                }
            });
            console.log(nonce);
            // sign data to unlock account with nonce and address
            const signature = await web3.eth.personal.sign(
                nonce.toString(),
                address[0]
            )
            const data = {
                address: address[0],
                signature,
                nonce,
            }
            // autheticate and return token
            const token = await doRequest({
                url: 'http://localhost:3000/auth',
                method: 'post',
                body: data,
                onSuccess: () => {
                    // Router.push('/')
                }
            });
            setToken(token);
        } catch (error) {
            console.log(error);
            setErrors(
                <div className="alert alert-danger">
                    <li>Oops...</li>
                </div>
            );
        }
    }

    const handleSignOut = async (event) => {
        event.preventDefault();
        try {    
            setErrors(null);
            // autheticate and return token
            doRequest({
                url: 'http://localhost:3000/auth/sign-out',
                method: 'post',
                body: data,
                onSuccess: () => {
                    Router.push('/')
                }
            });
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
            <div className="row justify-content-center">
                <p>
                    {currentAddress ? "Hello Metamask User" : "Please login with metamask"}
                </p>
                {!web3errors && <button className="btn btn-primary" onClick={currentAddress ? handleSignOut : handleSignin}>
                    {currentAddress ? "Sign Out" : "Sign In With MetaMask"}
                </button>}
            </div>
            {web3errors || requestErrors || errors}
        </div>
    );
}


LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const {data} = await client.get('/auth/current-address');
    return data;
}

export default LandingPage; 
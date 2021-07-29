import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import buildClient from '../api/build-client';


const AppComponent = ({ Component, pageProps, nonce }) => {
    console.log(pageProps, nonce, "props here");
    
    return (
        <div className="container">
            <Component nonce={nonce} {...pageProps} />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const {data} = await client.get('/token');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
        pageProps,
        nonce: data
    };
};


export default AppComponent;
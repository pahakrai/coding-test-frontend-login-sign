import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import buildClient from '../api/build-client';


const AppComponent = ({ Component, pageProps, currentAddress }) => {    
    return (
        <div className="container">
            <Component currentAddress={currentAddress} {...pageProps} />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const {data} = await client.get('/auth/current-address');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
        pageProps,
        currentAddress: data?.currentAddress
    };
};


export default AppComponent;
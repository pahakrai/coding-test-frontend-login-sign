import 'bootstrap/dist/css/bootstrap.css';

import buildClient from '../api/build-client';


const AppComponent = ({ Component, pageProps, currentAddress, currentToken }) => {    
    return (
        <div className="container">
            <Component currentAddress={currentAddress} currentToken={currentToken} {...pageProps} />
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
        currentAddress: data?.currentAddress,
        currentToken: data?.currentToken
    };
};


export default AppComponent;
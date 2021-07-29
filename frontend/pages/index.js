import { useEffect } from 'react';
import buildClient from '../api/build-client';

import Router from "next/router";

const LandingPage = ({ nonce }) => {
    // useEffect(() => Router.push('/auth/signin'), []);
    return (
        <div>
            <h1>
                {nonce ? "You are signed in" : "Sign in with Meta Mask"}
            </h1>
            <a href="/auth/signin">SignIn</a>
        </div>
    );
}

LandingPage.getInitialProps = async (context) => {
    // const client = buildClient(context);
    // const {data} = await client.get('/token');
    // return {nonce: data};
}

export default LandingPage;
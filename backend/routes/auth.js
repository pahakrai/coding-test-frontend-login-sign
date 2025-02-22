import express from 'express';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import jwt from 'jsonwebtoken';
import { currentAddress } from '../middlewares/current-address.js';

const router = express.Router();

router.post("/auth", async (req, res) => {
    const { address, signature, nonce } = req.body;
    // nonce to string before buffer to hex
    const msg = nonce.toString();
    const msgHex = bufferToHex(Buffer.from(msg, 'utf8'));
    const publicAddress = recoverPersonalSignature({
        data: msgHex,
        sig: signature,
    });
    // check if the recovered public address is equal to provided address
    if (address === publicAddress) {
        // can have user logic here before creating token
        const clientJwt = jwt.sign(
            {   
                publicAddress
            }, 
            process.env.JWT_KEY
        );
        // store it on session object
        req.session = { jwt : clientJwt};
        res.status(200).send(clientJwt);
    } else {
        res.status(401).send("address authorization failed");
    }
});

router.post('/auth/sign-out', (req, res)  => {
    req.session = null;
    res.send({});
});

router.get('/auth/current-address', currentAddress, (req, res)  => {
    // currentToken added for display on frontend
    res.send({currentAddress: req.currentAddress || null, currentToken: req.currentToken});
});

router.get("/token", (req, res) => {
    // in a real life scenario we would random this after each login and fetch it from the db as well
    const nonce = Math.floor(Math.random() * 1000000).toString();
    return res.send(nonce);
});

export { router as authRouter };
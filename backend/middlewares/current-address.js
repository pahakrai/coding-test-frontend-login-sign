import jwt from 'jsonwebtoken';
import { JWT_KEY } from "../index.js";

export const currentAddress = (
    req,
    res, 
    next
) => {
    console.log("wat", req?.session?.jwt);
    if (!req.session?.jwt) {
        return next();
    }
    try {
        const payload = jwt.verify(req.session.jwt, JWT_KEY);
        req.currentAddress = payload.publicAddress;
        console.log(payload, "payload");
    } catch (err) {
        console.error(err);
    }
    next();
};
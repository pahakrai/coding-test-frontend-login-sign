import jwt from 'jsonwebtoken';

export const currentAddress = (
    req,
    res, 
    next
) => {
    if (!req.session?.jwt) {
        return next();
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentAddress = payload?.publicAddress;
        req.currentToken = req.session.jwt;
    } catch (err) {
        console.error(err);
    }
    next();
};
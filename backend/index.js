import { app }  from './app.js';
import crypto from 'crypto';

const port = 3000;
// prepare JWT_KEY in process.env
export const JWT_KEY = crypto.randomBytes(20).toString('hex');

const start = async () => {
    // check from process.env  
    if (!JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }
    app.listen(port, async () => {
        console.log(`listening on port:: ${port}`);
    });
}

start();


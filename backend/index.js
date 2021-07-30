import { app }  from './app.js';

const start = async () => {
    // check from process.env  
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }
    app.listen(parseInt(process.env.PORT, 10), async () => {
        console.log(`listening on port:: ${process.env.PORT}`);
    });
}

start();


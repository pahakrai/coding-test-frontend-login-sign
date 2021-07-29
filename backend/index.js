import { app }  from './app.js'
const port = 3000;

const start = async () => {
    app.listen(port, async () => {
        console.log(`listening on port:: ${port}`);
    });
}

start();


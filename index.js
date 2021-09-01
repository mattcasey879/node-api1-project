const server = require('./api/server');

const port = 5000;
const hostname = '127.0.0.1'


server.listen(port, hostname, () => {
    console.log(`Server running on http://localhost:${port}`)
})
// START YOUR SERVER HERE

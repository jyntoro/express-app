const http = require("http");

http.createServer((request, response) => {
    response.write(`
        <h1>ITP 405</h1>
        <p>Hello class!</p>
    `);

    response.end();
})
.listen(8000);
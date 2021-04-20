const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();

app.get("/api/github/:username", (request, response) => {
    const username = request.params.username;
    const file = `${username}.txt`;

    fs.readFile(file, 'utf8', (error, data) => {
        if (error) {
            const promise = axios.get(`https://api.github.com/users/${username}`);
            promise.then((githubResponse) => {
                const repoCount = githubResponse.data.public_repos;
                fs.writeFile(file, String(repoCount), (error) => {
                    console.log('the file has been written to');
                });
                response.json({
                    repoCount: repoCount,
                });
            });
        } else {
            response.json({
                repoCount: Number(data),
            });
        }
    });
});

app.listen(8000);
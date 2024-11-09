// Create web server
// 1. Load all the comments from comments.json file
// 2. If user send GET request to /comments, then return all comments as JSON
// 3. If user send POST request to /comments, then append new comment to comments.json file and return new comment as JSON

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

app.get('/comments', function (req, res) {
    fs.readFile('comments.json', 'utf8', function (err, data) {
        if (err) {
            res.status(500).send('Internal server error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/comments', function (req, res) {
    fs.readFile('comments.json', 'utf8', function (err, data) {
        if (err) {
            res.status(500).send('Internal server error');
            return;
        }
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
            if (err) {
                res.status(500).send('Internal server error');
                return;
            }
            res.json(req.body);
        });
    });
});

app.listen(3000, function () {
    console.log('Web server is running on port 3000');
});
// Now you can access the comments using GET request to http://localhost:3000/comments and you can add new comment using POST request to http://localhost:3000/comments.

// You can test the server using curl or Postman.

// $ curl -X GET http://localhost:3000/comments
// []
// $ curl -X POST -d '{"name":"John Doe", "comment":"Hello, World!"}' -H "Content-Type: application/json" http://localhost:3000/comments
// {"name":"John Doe","comment":"Hello, World!"}
// $ curl -X GET http://localhost:3000/comments
// [{"name":"John Doe","comment":"Hello, World!"}]
// Now you have a simple web server that can load and save comments. You can build a simple comment system using this server.

// You can also use Ajax to send GET and POST requests to this server. Here is an example using jQuery:

// $.ajax({
//     url
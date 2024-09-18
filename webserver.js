const http = require("http");
const fs = require("fs");

// merender HTML
const renderHtml = (res, path) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write("Error: Not found");
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        }
    });
};

// Membuat server
http.createServer((req, res) => {
    // Minta url
    const url = req.url;

    if (url === "/about") {
        renderHtml(res, "./about.html");
    } else if (url === "/contact") {
        renderHtml(res, "./contact.html");
    } else {
        renderHtml(res, "./index.html");
    }
})
// Jalan di port mana
.listen(3000, () => {
    console.log("Server is listening on port 3000");
});



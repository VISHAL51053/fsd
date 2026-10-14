const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const ROOT = __dirname;

const mimeTypes = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "text/javascript",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon"
};

const server = http.createServer((req, res) => {
  let urlPath = req.url === "/" ? "/ex5.html" : req.url;
  let filePath = path.join(ROOT, urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h2>404 - File Not Found</h2>");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
  console.log("ex5.html  -> http://localhost:" + PORT + "/ex5.html");
  console.log("Press Ctrl+C to stop.");
});

const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/overview" || pathName === "/") {
    res.end("This is an Overview");
  } else if (pathName === "/product") {
    res.end("Product is into play");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found !!!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the server");
});

const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const slugify = require('slugify');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

// Server----------
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // Overview page
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join();
    const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardsHtml);
    res.end(output);
    //Product page--------------
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // APi==============
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(data);

    // Error====================
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'its-own': "'Checking the error",
    });
    res.end('<h1>Something is wrong</h1>');
  }
});
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to the server');
});

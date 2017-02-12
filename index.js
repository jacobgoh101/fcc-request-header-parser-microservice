const express = require("express");
const locale = require("locale");
// const os = require('os');
var uaParser = require('ua-parser-js');

const app = express();

app.get('*', (req,res) => {
  res.setHeader("Content-Type", "application/json");

  const locales = new locale.Locales(req.headers["accept-language"]);
  let ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let language = locales[0];
  let software = uaParser(req.headers["user-agent"]);
  software = software.os;
  let result = {
    ipaddress,
    language,
    software
  };
  result = JSON.stringify(result);
  res.end(result);
});

const port = process.env.PORT || 8080;
app.listen(port);

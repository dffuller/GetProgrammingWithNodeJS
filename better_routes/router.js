const httpStatusCodes = require("http-status-codes");

const htmlContentType = {
    "Content-Type": "text/html",
  },
  routes = {
    GET: {
      "/info": (_, res) => {
        res.writeHead(httpStatusCodes.StatusCodes.OK, {
          "Content-Type": "text/plain",
        });
        res.end("Welcome to the Info Page!");
      },
    },
    POST: {},
  };

exports.handle = (req, res) => {
  try {
    if (routes[req.method][req.url]) {
      routes[req.method][req.url](req, res);
    } else {
      res.writeHead(httpStatusCodes.httpStatus.NOT_FOUND, htmlContentType);
      res.end("<h1>No such file exists</h1>");
    }
  } catch (ex) {
    console.log("error: " + ex);
  }
};

exports.get = (url, action) => {
  routes["GET"][url] = action;
};
exports.post = (url, action) => {
  routes["POST"][url] = action;
};

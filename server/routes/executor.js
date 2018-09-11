let express = require("express");
let node_rest_client = require("node-rest-client").Client;
let restClient = new node_rest_client();
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

const EXECUTOR_SERVER_URL = 'http://dockerhost:5000/build_and_run';

restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

let router = express.Router();
router.post("/build_and_run", jsonParser, (req, res) => {
  const userCode = req.body.user_code;
  const lang = req.body.lang;

  console.log(lang + ': ' + userCode);
  restClient.methods.build_and_run(
    {
      headers: { "Content-Type": "application/json" },
      data: {
        code: userCode,
        lang: lang
      }
    }, (data, response) => {
      console.log("Received response from execution server: " + response);
      const text = `
        Build output: ${data['build']}
        Execute output: ${data['run']}
      `;
      data['text'] = text;
      res.json(data);
    }
  );
});

module.exports = router;
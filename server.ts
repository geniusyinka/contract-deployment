// Imports
// ========================================================
import http, { IncomingMessage, ServerResponse } from "http";
import * as solc from "solc";

// Config
// ========================================================
const host = "localhost";
const port = 8000;
let input: any = {
  language: "Solidity",
  sources: {
    //   'test.sol': {
    //     content: `// SPDX-License-Identifier: MIT\n
    //     pragma solidity ^0.8.9;\n
    //     contract C { function f() public { } }`
    //   }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

// Listener
// ========================================================
const requestListener = function (req: IncomingMessage, res: ServerResponse) {
    console.group("requestListener");
    console.log({ method: req.method });
  
    let input: any = {
      language: "Solidity",
      sources: {},
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };
  
    if (req.method == "POST") {
      let jsonString = "";
  
      req.on("data", function (data) {
        jsonString += data;
      });
  
      req.on("end", function () {
        try {
          const parsed = JSON.parse(jsonString);
          console.log(parsed);
  
          input.sources[parsed?.["name"] ?? ""] = {
            content: parsed?.["content"] || "",
          };
          console.log({ input });
  
          const compiled = solc.compile(JSON.stringify(input));
          const compiledParsed = JSON.parse(compiled);
          console.log({ compiled: compiledParsed });
  
          const contractName = Object.keys(compiledParsed.contracts[parsed?.["name"] ?? ""])[0];
          const abi = compiledParsed.contracts[parsed?.["name"] ?? ""][contractName].abi;
          const bytecode = compiledParsed.contracts[parsed?.["name"] ?? ""][contractName].evm.bytecode.object;
          console.log({ abi });
          console.log({ bytecode });
  
          res.setHeader("Content-Type", "application/json");
          res.writeHead(200);
          console.groupEnd();
          res.end(JSON.stringify({ abi, bytecode }));
        } catch (error) {
          console.error("Error processing request:", error);
          res.writeHead(500);
          res.end("Error processing request");
        }
      });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      console.groupEnd();
      res.end(JSON.stringify({ ok: true }));
    }
  };

// Server
// ========================================================
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
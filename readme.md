What we need:

 - solcJS (compliling solidity code with javascript)
 - react native code editor
 - React Native Context
 - web3 modal
 
 Test code:
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting;

    constructor() {
        greeting = "Hello, World!!";
    }

    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
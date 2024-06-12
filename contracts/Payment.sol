// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Payment {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function pay(address payable recipient) public payable {
        require(msg.value > 0, "Send some ether");
        recipient.transfer(msg.value);
    }
}

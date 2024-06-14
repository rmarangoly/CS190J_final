// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct User {
        uint userId;
        string username;
        uint ethBalance;
        uint[] itemsOwned;
    }

    struct Item {
        uint itemId;
        string itemName;
        string itemDescription;
        uint price;
        uint ownerId;
        bool isForSale;
    }

    struct Transaction {
        uint buyerId;
        uint sellerId;
        uint itemId;
        uint transactionAmount;
    }

    mapping(uint => User) public users;
    mapping(uint => Item) public items;
    Transaction[] public transactions;

    uint public userCount;
    uint public itemCount;

    event UserRegistered(uint userId, string username);
    event ItemAdded(uint itemId, string itemName, uint price, uint ownerId);
    event ItemBought(uint itemId, uint buyerId, uint sellerId, uint price);
    event ItemListedForSale(uint itemId, uint ownerId, uint price);

    modifier onlyUser(uint userId) {
        require(users[userId].userId == userId, "User not registered.");
        _;
    }

    function registerUser(string memory username) public {
        userCount++;
        users[userCount] = User(userCount, username, 0, new uint[](0));
        emit UserRegistered(userCount, username);
    }

    function addItem(string memory itemName, string memory itemDescription, uint price) public onlyUser(userCount) {
        itemCount++;
        items[itemCount] = Item(itemCount, itemName, itemDescription, price, userCount, true);
        users[userCount].itemsOwned.push(itemCount);
        emit ItemAdded(itemCount, itemName, price, userCount);
    }
    
}
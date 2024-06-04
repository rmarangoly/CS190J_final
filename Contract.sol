// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MarcryptMarketplace is ReentrancyGuard {
    struct Item {
        uint256 id;
        address payable seller;
        string name;
        string description;
        uint256 price;
        bool sold;
    }

    uint256 public itemCount;
    mapping(uint256 => Item) public items;

    event ItemListed(
        uint256 id,
        address seller,
        string name,
        string description,
        uint256 price,
        bool sold
    );

    event ItemPurchased(
        uint256 id,
        address buyer,
        address seller,
        uint256 price
    );
    // listItem is called when user clicks List on a item that is available
    function listItem(string memory _name, string memory _description, uint256 _price) public {
        require(_price > 0, "Price must be greater than zero");

        itemCount++;
        items[itemCount] = Item(
            itemCount,
            payable(msg.sender),
            _name,
            _description,
            _price,
            false
        );

        emit ItemListed(itemCount, msg.sender, _name, _description, _price, false);
    }
    // purchaseItem is called when a user clicks a buy button 
    function purchaseItem(uint256 _id) public payable nonReentrant {
        Item memory item = items[_id];
        require(item.id > 0 && item.id <= itemCount, "Item does not exist");
        require(msg.value == item.price, "Please submit the asking price in order to complete the purchase");
        require(!item.sold, "Item has already been sold");
        require(item.seller != msg.sender, "Seller cannot buy their own item");

        item.seller.transfer(msg.value);
        item.sold = true;
        items[_id] = item;

        emit ItemPurchased(_id, msg.sender, item.seller, item.price);
    }

    function fetchItem(uint256 _id) public view returns (Item memory) {
        require(_id > 0 && _id <= itemCount, "Item does not exist");
        return items[_id];
    }
    // use fetchitems to display on the frontend marketplace
    function fetchItems() public view returns (Item[] memory) {
        Item[] memory listedItems = new Item[](itemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            listedItems[i - 1] = items[i];
        }
        return listedItems;
    }
}

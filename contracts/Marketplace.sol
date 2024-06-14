// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Item {
        uint256 id;
        string name;
        address owner;
        uint256 price;
        bool listed;
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCount;

    event ItemListed(uint256 id, string name, address owner, uint256 price);
    event ItemBought(uint256 id, address newOwner, uint256 price);

    function listItem(string memory name, uint256 price) public {
        itemCount++;
        items[itemCount] = Item(itemCount, name, msg.sender, price, true);
        emit ItemListed(itemCount, name, msg.sender, price);
    }

    function buyItem(uint256 id) public payable {
        Item storage item = items[id];
        require(item.listed, "Item not listed for sale");
        require(msg.value >= item.price, "Insufficient funds to buy item");

        address payable seller = payable(item.owner);
        item.owner = msg.sender;
        item.listed = false;

        seller.transfer(msg.value);
        emit ItemBought(id, msg.sender, item.price);
    }

    function getItemCount() public view returns (uint256) {
        return itemCount;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Marketplace
 * @dev A smart contract for managing items in a marketplace
 */
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

    /**
     * @dev List an item for sale
     * @param name The name of the item
     * @param price The price of the item
     */
    function listItem(string memory name, uint256 price) public {
        itemCount++;
        items[itemCount] = Item(itemCount, name, msg.sender, price, true);
        emit ItemListed(itemCount, name, msg.sender, price);
    }

    /**
     * @dev Buy an item from the marketplace
     * @param id The ID of the item to buy
     */
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

    /**
     * @dev Get the total count of items in the marketplace
     * @return The total count of items
     */
    function getItemCount() public view returns (uint256) {
        return itemCount;
    }

    /**
     * @dev Relist an item in the marketplace
     * @param itemId The ID of the item to relist
     */
    function relistItem(uint256 itemId) public {
        Item storage item = items[itemId];
        require(item.owner == msg.sender, "You are not the owner of this item");
        item.listed = true;
    }
}

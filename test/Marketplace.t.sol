// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Test, console } from "forge-std/Test.sol";
import "../contracts/Marketplace.sol";

contract MarketplaceTest is Test {
    Marketplace marketplace;
    address owner;
    address addr1;
    address addr2;

    function setUp() public {
        owner = address(this);
        addr1 = vm.addr(1);
        addr2 = vm.addr(2);

        marketplace = new Marketplace();
    }

    function testListItem() public {
        string memory itemName = "Item 1";
        uint256 itemPrice = 1 ether;

        marketplace.listItem(itemName, itemPrice);

        (uint256 id, string memory name, address itemOwner, uint256 price, bool listed) = marketplace.items(1);

        assertEq(id, 1);
        assertEq(name, itemName);
        assertEq(itemOwner, owner);
        assertEq(price, itemPrice);
        assertTrue(listed);
    }


    function testCannotBuyWithInsufficientFunds() public {
        string memory itemName = "Item 1";
        uint256 itemPrice = 1 ether;

        marketplace.listItem(itemName, itemPrice);

        vm.prank(addr1);
        vm.deal(addr1, 0.5 ether);
        vm.expectRevert("Insufficient funds to buy item");
        marketplace.buyItem{value: 0.5 ether}(1);
    }
}

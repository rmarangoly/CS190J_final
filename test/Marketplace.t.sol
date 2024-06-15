// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console, stdError} from "forge-std/Test.sol";
import "forge-std/Vm.sol";
import "../contracts/Marketplace.sol";

contract MarketplaceTest is Test {
    Marketplace public marketplace;
    //Marketplace public marketplace2;
    
    function setUp() public {
        marketplace = new Marketplace();
        //marketplace2 = new Marketplace();
    }

    function testListItem() public {
        marketplace.listItem("Item 1", 1 ether);
        (uint256 id, string memory name, address owner, uint256 price, bool listed) = marketplace.items(1);
        assertEq(id, 1);
        assertEq(name, "Item 1");
        assertEq(owner, address(this));
        assertEq(price, 1 ether);
        assertTrue(listed);
    }

    

    function testBuyItemInsufficientFunds() public {
        marketplace.listItem("Item 1", 1 ether);
        vm.prank(address(1));
        vm.expectRevert();
        marketplace.buyItem{value: 0.5 ether}(1);
    }

    function testBuyItemNotListed() public {

        vm.expectRevert("Item not listed for sale");
        marketplace.buyItem{value: 1 ether}(2);
    }

    function testGetItemCount() public {
        assertEq(marketplace.getItemCount(), 0);
        marketplace.listItem("Item 1", 1 ether);
        assertEq(marketplace.getItemCount(), 1);
    }

    function testRelistItem() public {
        marketplace.listItem("Item 1", 1 ether);
        //marketplace.buyItem{value: 1 ether}(1);
        marketplace.relistItem(1);
        (, , , , bool listed) = marketplace.items(1);
        assertTrue(listed);
    }

    function testRelistItemNotOwner() public {
        marketplace.listItem("Item 1", 1 ether);
        //marketplace.buyItem{value: 1 ether}(1);
        vm.prank(address(2));
        vm.expectRevert("You are not the owner of this item");
        marketplace.relistItem(1);
    }

    function testListMultipleItems() public {
        marketplace.listItem("Item 1", 1 ether);
        marketplace.listItem("Item 2", 2 ether);
        assertEq(marketplace.getItemCount(), 2);
    }

    function testItemProperties() public {
        marketplace.listItem("Item 1", 1 ether);
        (uint256 id, string memory name, address owner, uint256 price, bool listed) = marketplace.items(1);
        assertEq(id, 1);
        assertEq(name, "Item 1");
        assertEq(owner, address(this));
        assertEq(price, 1 ether);
        assertTrue(listed);
    }

    function testOwnerCannotBuyOwnItem() public {
        marketplace.listItem("Item 1", 1 ether);
        vm.expectRevert();
        marketplace.buyItem{value: 1 ether}(1);
    }
    function testListAndRelistItemNotOwner() public {
        
        marketplace.listItem("Item 1", 1 ether);

        
        (, , , , bool listed) = marketplace.items(1);
        assertTrue(listed);

        
        vm.prank(address(2));
        vm.expectRevert("You are not the owner of this item");
        marketplace.relistItem(1);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract MyToken is ERC20, ERC20Permit {
    constructor() ERC20("Batman", "BAT") ERC20Permit("Batman") {}

    function mint(address to, uint256 value) public {
        _mint(to, value);
    }
}


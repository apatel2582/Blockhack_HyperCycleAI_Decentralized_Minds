// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenB is ERC20, Ownable {
    address public bridgeBAddress;

    constructor() ERC20("TokenB", "TKB") {}

    function setBridgeAddress(address _bridgeBAddress) external onlyOwner {
        bridgeBAddress = _bridgeBAddress;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == bridgeBAddress, "Only the bridge contract can mint tokens");
        _mint(to, amount);
    }
    
}

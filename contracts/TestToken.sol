//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./CommitmintToken.sol";

contract TestToken is CommitmintToken {
    // Counter.
    using Counters for Counters.Counter;
    Counters.Counter private _tokens;

    /// @notice constructor.
    constructor() ERC721("TestToken", "TEST") {}

    /// @notice Public offer.
    function offer(address to) external {
        _safeMint(_msgSender(), 1);
        _offers[1] = to;
        emit Offer(_msgSender(), to, 1);
    }
}

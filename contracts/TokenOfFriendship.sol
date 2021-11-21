//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./CommitmintToken.sol";

contract TokenOfFriendship is CommitmintToken {
    // Counter.
    using Counters for Counters.Counter;
    Counters.Counter private _tokens;

    /// @notice constructor.
    constructor() ERC721("TokenOfFriendship", "FRIENDS") {}

    /// @notice Public offer.
    function offer(address to) external nonReentrant {
        _tokens.increment();
        uint256 tokenId = _tokens.current();
        _offers[tokenId] = to;
        _safeMint(_msgSender(), tokenId);
        emit Offer(_msgSender(), to, tokenId);
    }
}

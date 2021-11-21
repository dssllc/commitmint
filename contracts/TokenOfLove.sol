//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./CommitmintToken.sol";

contract TokenOfLove is CommitmintToken {
    // Contants.
    uint256 constant private BURN_MINIMUM = 0 ether;
    address payable constant private BURN_ADDRESS = payable(0x000000000000000000000000000000000000dEaD);

    // Errors.
    error PaymentError();

    // Counter.
    using Counters for Counters.Counter;
    Counters.Counter private _tokens;

    /// @notice constructor.
    constructor() ERC721("TokenOfLove", "LOVE") {}

    /// @notice Public offer.
    function offer(address to) external payable nonReentrant {
        if (msg.value <= BURN_MINIMUM)
            revert InvalidPayment();

        (bool sent, bytes memory data) = BURN_ADDRESS.call{value: msg.value}("");
        if (!sent)
            revert PaymentError();

        _tokens.increment();
        uint256 tokenId = _tokens.current();
        _offers[tokenId] = to;
        _safeMint(_msgSender(), tokenId);
        emit Offer(_msgSender(), to, tokenId);
    }
}

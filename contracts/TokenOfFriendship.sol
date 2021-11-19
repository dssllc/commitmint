//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenOfFriendship is ERC721 {
    // Contants.
    uint256 constant private BURN_AMOUNT = 0.001 ether;
    address constant private BURN_ADDRESS = 0x000000000000000000000000000000000000dEaD;

    // Counter.
    using Counters for Counters.Counter;
    Counters.Counter private _tokens;

    // Errors.
    error InvalidPayment();

    /// @notice constructor.
    constructor() ERC721("TokenOfFriendship", "FRIEND") {}

    /// @notice Public mint.
    function mint() external payable {
        if (msg.value != BURN_AMOUNT)
            revert InvalidPayment();

        _tokens.increment();
        payable(BURN_ADDRESS).transfer(BURN_AMOUNT);
        _safeMint(_msgSender(), _tokens.current());
    }
}

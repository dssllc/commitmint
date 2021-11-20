//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenOfFriendship is ERC721 {
    // Contants.
    uint256 constant private BURN_AMOUNT = 0.001 ether;
    address payable constant private BURN_ADDRESS = payable(0x000000000000000000000000000000000000dEaD);

    // Counter.
    using Counters for Counters.Counter;
    Counters.Counter private _tokens;

    // Mapping from token ID to request address.
    mapping(uint256 => address) private _requests;

    // Events.
    event Request(address indexed from, address indexed to, uint256 indexed tokenId);

    // Errors.
    error InvalidPayment();
    error NoApprovals();
    error NoTransfers();

    /// @notice constructor.
    constructor() ERC721("TokenOfFriendship", "FRIENDS") {}

    /// @notice Public request.
    function request(address to) external payable {
        if (msg.value != BURN_AMOUNT)
            revert InvalidPayment();

        BURN_ADDRESS.transfer(BURN_AMOUNT);
        _tokens.increment();
        uint256 tokenId = _tokens.current();
        _safeMint(_msgSender(), tokenId);
        _approve(address(this), tokenId);
        _requests[tokenId] = to;
        emit Request(_msgSender(), to, tokenId);
    }

    /// @dev See {IERC721-approve}.
    function approve(
        address to,
        uint256 tokenId
    ) public virtual override {
        to; tokenId; revert NoApprovals();
    }

    /// @dev See {IERC721-setApprovalForAll}.
    function setApprovalForAll(
        address operator,
        bool approved
    ) public virtual override {
        revert NoApprovals();
    }

    /// @dev See {IERC721-transferFrom}.
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        from; to; tokenId; revert NoTransfers();
    }

    /// @dev See {IERC721-safeTransferFrom}.
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        revert NoTransfers();
    }
}

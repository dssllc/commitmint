//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

abstract contract CommitmintToken is ERC721 {

    // Mapping from token ID to request address.
    mapping(uint256 => address) internal _offers;

    // Events.
    event Offer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Accept(address indexed from, address indexed to, uint256 indexed tokenId);

    // Errors.
    error InvalidPayment();
    error NoApprovals();
    error NoTransfers();
    error InvalidAcceptance();

    /// @notice Public accept.
    function accept(uint256 tokenId) external {
        bool requestExists = _offers[tokenId] != address(0);
        bool requestIsForSender = _offers[tokenId] == _msgSender();
        if (!requestExists || !requestIsForSender)
            revert InvalidAcceptance();

        address requestor = ownerOf(tokenId);
        delete _offers[tokenId];
        _safeTransfer(requestor, _msgSender(), tokenId, "");
        emit Accept(requestor, _msgSender(), tokenId);
    }

    /// @dev See {IERC721-approve}.
    function approve(
        address to,
        uint256 tokenId
    ) public virtual override {
        revert NoApprovals();
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
        revert NoTransfers();
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

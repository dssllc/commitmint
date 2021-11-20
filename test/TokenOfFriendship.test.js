const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenOfFriendship", function () {

  let contract, TokenOfFriendship, owner, secondAddress;

  before(async function() {
    // Get addresses.
    [owner, secondAddress, thirdAddress] = await ethers.getSigners();
    // Compile and deploy contract.
    contract = await ethers.getContractFactory("TokenOfFriendship");
    TokenOfFriendship = await contract.deploy();
    await TokenOfFriendship.deployed();
  });

  it("should create an offer and mint a token", async function () {
    // Setup token and offer.
    await expect(TokenOfFriendship.offer(thirdAddress.address))
      .to.emit(TokenOfFriendship, "Offer")
      .withArgs(owner.address, thirdAddress.address, 1);
    // Verify token is minted to the owner.
    expect(await TokenOfFriendship.ownerOf(1)).to.equal(owner.address);
  });

  it("should not allow transfer approvals", async function () {
    let msg = "NoApprovals";
    // Attempt approve.
    await expect(
      TokenOfFriendship.approve(secondAddress.address, 1)
    ).to.be.revertedWith(msg);
    // Attempt setApprovalForAll.
    await expect(
      TokenOfFriendship.setApprovalForAll(secondAddress.address, true)
    ).to.be.revertedWith(msg);
  });

  it("should not allow transfers", async function () {
    let msg = "NoTransfers";
    // Attempt transferFrom.
    await expect(
      TokenOfFriendship.transferFrom(owner.address, secondAddress.address, 1)
    ).to.be.revertedWith(msg);
  });

  it("should not confirm invalid acceptance", async function () {
    let msg = "InvalidAcceptance";
    // Attempt accept for missing request.
    await expect(
      TokenOfFriendship.accept(2)
    ).to.be.revertedWith(msg);
    // Attempt accept for wrong request.
    let secondAddressConnection = TokenOfFriendship.connect(secondAddress);
    await expect(
      secondAddressConnection.accept(1)
    ).to.be.revertedWith(msg);
  });

  it("should confirm valid acceptance", async function () {
    // Accept request.
    let thirdAddressConnection = TokenOfFriendship.connect(thirdAddress);
    await expect(thirdAddressConnection.accept(1))
      .to.emit(TokenOfFriendship, "Accept")
      .withArgs(owner.address, thirdAddress.address, 1);
    // Verify token is transfered to sender
    expect(await TokenOfFriendship.ownerOf(1)).to.equal(thirdAddress.address);
  });
});

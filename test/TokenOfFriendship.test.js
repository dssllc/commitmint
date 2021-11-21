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
});

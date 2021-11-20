const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenOfFriendship", function () {

  let contract, TokenOfFriendship, owner, secondAddress;

  const BURN_ADDRESS = "0x000000000000000000000000000000000000dead";

  before(async function() {
    // Get addresses.
    [owner, secondAddress] = await ethers.getSigners();
    // Compile and deploy contract.
    contract = await ethers.getContractFactory("TokenOfFriendship");
    TokenOfFriendship = await contract.deploy();
    await TokenOfFriendship.deployed();
  });

  it("should require payment to mint", async function () {
    await expect(
      TokenOfFriendship.mint()
    ).to.be.reverted;
  });

  it("should require the correct payment to mint", async function () {
    let msg = "InvalidPayment";
    // Overpayment.
    let overrides = {
      value: ethers.utils.parseEther(".1")
    };
    await expect(
      TokenOfFriendship.mint(overrides)
    ).to.be.revertedWith(msg);
    // Underpayment.
    overrides.value = ethers.utils.parseEther(".00001")
    // Attempt mint.
    await expect(
      TokenOfFriendship.mint(overrides)
    ).to.be.revertedWith(msg);
  });

  it("should burn the correct amount of ether to mint", async function () {
    let overrides = {
      value: ethers.utils.parseEther(".001")
    };
    // Get current balance of owner.
    let ownerBalance = await ethers.provider.getBalance(owner.address);
    // Get current balance of burn address.
    expect((await ethers.provider.getBalance(BURN_ADDRESS))).to.equal(0);
    // Mint the token.
    await TokenOfFriendship.mint(overrides);
    // Verify token is minted to the owner.
    expect(await TokenOfFriendship.ownerOf(1)).to.equal(owner.address);
    // Expect the owner balance to be less the burn amount
    // and within .002ETH for gas
    expect(
      await ethers.provider.getBalance(owner.address)
    ).to.be.closeTo(
      ownerBalance.sub(overrides.value),
      ethers.utils.parseEther(".002")
    );
    // Expect burn address to have the burned ether.
    expect((await ethers.provider.getBalance(BURN_ADDRESS))).to.equal(overrides.value);
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
});

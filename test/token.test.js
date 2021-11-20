const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenOfFriendship", function () {

  let contract, TokenOfFriendship, owner, secondAddress;

  const BURN_ADDRESS = "0x000000000000000000000000000000000000dead";

  before(async function() {
    // Get addresses.
    [owner, secondAddress, thirdAddress] = await ethers.getSigners();
    // Compile and deploy contract.
    contract = await ethers.getContractFactory("TokenOfFriendship");
    TokenOfFriendship = await contract.deploy();
    await TokenOfFriendship.deployed();
  });

  it("should require payment to request", async function () {
    await expect(
      TokenOfFriendship.request(thirdAddress.address)
    ).to.be.reverted;
  });

  it("should require the correct payment to request", async function () {
    let msg = "InvalidPayment";
    // Overpayment.
    let overrides = {
      value: ethers.utils.parseEther(".1")
    };
    await expect(
      TokenOfFriendship.request(thirdAddress.address, overrides)
    ).to.be.revertedWith(msg);
    // Underpayment.
    overrides.value = ethers.utils.parseEther(".00001")
    // Attempt request.
    await expect(
      TokenOfFriendship.request(thirdAddress.address, overrides)
    ).to.be.revertedWith(msg);
  });

  it("should burn the correct amount of ether to request", async function () {
    let overrides = {
      value: ethers.utils.parseEther(".001")
    };
    // Get current balance of owner.
    let ownerBalance = await ethers.provider.getBalance(owner.address);
    // Get current balance of burn address.
    expect((await ethers.provider.getBalance(BURN_ADDRESS))).to.equal(0);
    // Setup token and request.
    await expect(TokenOfFriendship.request(thirdAddress.address, overrides))
      .to.emit(TokenOfFriendship, "Request")
      .withArgs(owner.address, thirdAddress.address, 1);
    // Verify token is requested to the owner.
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

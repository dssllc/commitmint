const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenOfLove", function () {

  let contract, TokenOfLove, owner, secondAddress;

  const BURN_ADDRESS = "0x000000000000000000000000000000000000dead";

  before(async function() {
    // Get addresses.
    [owner, secondAddress, thirdAddress] = await ethers.getSigners();
    // Compile and deploy contract.
    contract = await ethers.getContractFactory("TokenOfLove");
    TokenOfLove = await contract.deploy();
    await TokenOfLove.deployed();
  });

  it("should require payment to request", async function () {
    await expect(
      TokenOfLove.offer(thirdAddress.address)
    ).to.be.reverted;
  });

  it("should require the correct payment to request", async function () {
    let msg = "InvalidPayment";
    // Overpayment.
    let overrides = {
      value: ethers.utils.parseEther(".1")
    };
    await expect(
      TokenOfLove.offer(thirdAddress.address, overrides)
    ).to.be.revertedWith(msg);
    // Underpayment.
    overrides.value = ethers.utils.parseEther(".00001")
    // Attempt request.
    await expect(
      TokenOfLove.offer(thirdAddress.address, overrides)
    ).to.be.revertedWith(msg);
  });

  it("should burn the correct amount of ether to request", async function () {
    let overrides = {
      value: ethers.utils.parseEther(".001")
    };
    // Get current balance of owner.
    let ownerBalance = await ethers.provider.getBalance(owner.address);
    // Get current balance of burn address.
    let burnBalance = await ethers.provider.getBalance(BURN_ADDRESS);
    // Setup token and request.
    await expect(TokenOfLove.offer(thirdAddress.address, overrides))
      .to.emit(TokenOfLove, "Offer")
      .withArgs(owner.address, thirdAddress.address, 1);
    // Verify token is requested to the owner.
    expect(await TokenOfLove.ownerOf(1)).to.equal(owner.address);
    // Expect the owner balance to be less the burn amount
    // and within .002ETH for gas
    expect(
      await ethers.provider.getBalance(owner.address)
    ).to.be.closeTo(
      ownerBalance.sub(overrides.value),
      ethers.utils.parseEther(".002")
    );
    // Expect burn address to have the burned ether.
    let newBurnBalance = await ethers.provider.getBalance(BURN_ADDRESS)
    expect(newBurnBalance).to.equal(burnBalance.add(overrides.value));
    // Expect contract amount to be 0.
    expect(await ethers.provider.getBalance(BURN_ADDRESS)).to.equal(0);
  });

  it("should not allow transfer approvals", async function () {
    let msg = "NoApprovals";
    // Attempt approve.
    await expect(
      TokenOfLove.approve(secondAddress.address, 1)
    ).to.be.revertedWith(msg);
    // Attempt setApprovalForAll.
    await expect(
      TokenOfLove.setApprovalForAll(secondAddress.address, true)
    ).to.be.revertedWith(msg);
  });

  it("should not allow transfers", async function () {
    let msg = "NoTransfers";
    // Attempt transferFrom.
    await expect(
      TokenOfLove.transferFrom(owner.address, secondAddress.address, 1)
    ).to.be.revertedWith(msg);
  });

  it("should not confirm invalid acceptance", async function () {
    let msg = "InvalidAcceptance";
    // Attempt accept for missing request.
    await expect(
      TokenOfLove.accept(2)
    ).to.be.revertedWith(msg);
    // Attempt accept for wrong request.
    let secondAddressConnection = TokenOfLove.connect(secondAddress);
    await expect(
      secondAddressConnection.accept(1)
    ).to.be.revertedWith(msg);
  });

  it("should confirm valid acceptance", async function () {
    // Accept request.
    let thirdAddressConnection = TokenOfLove.connect(thirdAddress);
    await expect(thirdAddressConnection.accept(1))
      .to.emit(TokenOfLove, "Accept")
      .withArgs(owner.address, thirdAddress.address, 1);
    // Verify token is transfered to sender
    expect(await TokenOfLove.ownerOf(1)).to.equal(thirdAddress.address);
  });
});

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

  it("should require an amount greater than zero to offer a token", async function () {
    let msg = "InvalidPayment";
    // Overpayment.
    let overrides = {
      value: ethers.utils.parseEther("0")
    };
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
    expect(await ethers.provider.getBalance(TokenOfLove.address)).to.equal(0);
  });
});

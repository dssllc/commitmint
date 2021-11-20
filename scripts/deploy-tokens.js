const hre = require("hardhat");

async function main() {
  let contract = await hre.ethers.getContractFactory("TokenOfFriendship");
  const TokenOfFriendship = await contract.deploy();

  await TokenOfFriendship.deployed();

  console.log("TokenOfFriendship deployed to:", TokenOfFriendship.address);

  contract = await hre.ethers.getContractFactory("TokenOfLove");
  const TokenOfLove = await contract.deploy();

  await TokenOfLove.deployed();

  console.log("TokenOfLove deployed to:", TokenOfLove.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

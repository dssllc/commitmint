const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.getContractFactory("TokenOfFriendship");
  const TokenOfFriendship = await contract.deploy();

  await TokenOfFriendship.deployed();

  console.log("TokenOfFriendship deployed to:", TokenOfFriendship.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function main() {
    // Get the contract to deploy
    const Marketplace = await ethers.getContractFactory("Marketplace");
    console.log("Deploying Marketplace...");
    const marketplace = await Marketplace.deploy();
  
    await marketplace.deployed();
    console.log("Marketplace deployed to:", marketplace.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
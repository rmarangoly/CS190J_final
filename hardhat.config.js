require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const { API_URL, PRIVATE_KEY } = process.env;

 
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "sepolia", 
   networks: {    
     sepolia: {     
      url: "https://sepolia.infura.io/v3/d1d81bda2b90466fb5dd806f634c6412",      
      accounts: [``],   
     }
   }
};

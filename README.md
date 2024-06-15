# Marcrypt

## Prerequisites

Make sure you have the following installed on your local machine:

- Node.js (v18.17 or later)
- npm (v6 or later)
- MetaMask extension for your browser

## Cloning the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/rmarangoly/CS190J_final
cd 190J_final
```

## Installing Dependencies
Navigate to the project directory and install the necessary dependencies:
```
npm install
```

## Running the Development Server
Start the development server using the following command:
```
npm run dev
```
The application should now be running on http://localhost:3000.

## Connecting MetaMask Wallet
To interact with the application, you need to connect your MetaMask wallet and switch to the Sepolia testnet.

## Switching to the Sepolia Testnet
- Open MetaMask and click on the network dropdown at the top of the extension.
- Select Sepolia Test Network from the list. If it's not listed, you may need to add it manually.

## Getting Sepolia Testnet ETH
To interact with the Sepolia testnet, you'll need some test ETH. You can get test ETH from a faucet:
- Visit the Sepolia faucet.
- Enter your MetaMask wallet address and request some test ETH.

Once your MetaMask wallet is set up and you have some test ETH, you can start interacting with the application. Make sure your MetaMask is connected to the Sepolia testnet.
Start by listing an item to the marketplace, or by buying any items that are already listed.

## Install Foundry
https://github.com/foundry-rs/foundry#installation

Install Dependencies, Compile Contracts and Run Tests by executing: 
```
forge install
forge build
forge test
```



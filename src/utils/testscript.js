async function checkBalance() {
    const provider = new ethers.providers.InfuraProvider('sepolia', 'https://sepolia.infura.io/v3/d1d81bda2b90466fb5dd806f634c6412');
    const balance = await provider.getBalance('');
    console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);
  }
  
checkBalance();
  
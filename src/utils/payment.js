import { ethers } from 'ethers';

const marketplaceAddress = '0x9e5B612221A362B79F3D1A1B7bB10561e64c04B4';
const marketplaceABI = [
  "function buyItem(uint256 id) public payable",
  "function items(uint256) view returns (uint256 id, address owner, uint256 price, bool listed)",
  "function getItemCount() public view returns (uint256)",
  "function listItem(string memory name, uint256 price) public",
];
export const payUser = async (recipient, amount) => {
  try {
    if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');

    await window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const paymentContract = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);

    const transaction = await paymentContract.pay(recipient, { value: ethers.utils.parseEther(amount) });
    await transaction.wait();

    return signer.getAddress();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getItemCount = async () => {
  if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(marketplaceAddress, marketplaceABI, provider);
  const itemCount = await contract.getItemCount();
  return itemCount.toNumber();
};
export const listItemOnContract = async (name, price) => {
  try {
    if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');

    await window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);

    const priceInWei = ethers.utils.parseEther(price.toString());
    const transaction = await marketplaceContract.listItem(name, priceInWei);
    await transaction.wait();

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};


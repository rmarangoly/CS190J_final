import { ethers } from 'ethers';

const marketplaceAddress = '0xE419aEf5E71b5220D3EBAd8a48E6615F1bF53839';
const marketplaceABI = [
  "function buyItem(uint256 id) public payable",
  "function items(uint256) view returns (uint256 id, address owner, uint256 price, bool listed)",
  "function getItemCount() public view returns (uint256)"
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
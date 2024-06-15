import { ethers } from 'ethers';

const marketplaceAddress = '0x703eFB529f7FD843d4393F4da227dF31bC0B4810';
const marketplaceABI = [
  "function buyItem(uint256 id) public payable",
  "function items(uint256) view returns (uint256 id, string memory name, address owner, uint256 price, bool listed)",
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
    console.log("transaction");
    const transaction = await paymentContract.buyItem(recipient, { value: ethers.utils.parseEther(amount) });
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
    console.log(price.toString())
    console.log(priceInWei)
    console.log(name)
    const transaction = await marketplaceContract.listItem(name, ethers.utils.parseEther(price.toString()));
    await transaction.wait();

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};


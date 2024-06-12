import { ethers } from 'ethers';

const paymentAddress = '0x13542C194B0b3d80e017408d6DE15B971E840E84';
const paymentABI = [
  "function pay(address payable recipient) public payable",
];

export const payUser = async (recipient, amount) => {
  try {
    if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');

    await window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const paymentContract = new ethers.Contract(paymentAddress, paymentABI, signer);

    const transaction = await paymentContract.pay(recipient, { value: ethers.utils.parseEther(amount) });
    await transaction.wait();

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

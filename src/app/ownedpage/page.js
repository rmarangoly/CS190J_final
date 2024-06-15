'use client';  // Add this line at the top

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from '../page.module.css';

const marketplaceAddress = '0x703eFB529f7FD843d4393F4da227dF31bC0B4810';
const marketplaceABI = [
  "function items(uint256) view returns (uint256 id, string memory name, address owner, uint256 price, bool listed)",
  "function itemCount() view returns (uint256)",
  "function relistItem(uint256 itemId) public" // Ensure this matches your contract's function
];

export default function OwnedPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      if (!window.ethereum) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);

      const contract = new ethers.Contract(marketplaceAddress, marketplaceABI, provider);

      try {
        const itemCount = await contract.itemCount();
        const items = [];
        for (let i = 1; i <= itemCount; i++) {
          const item = await contract.items(i);
          if (item.owner.toLowerCase() === address.toLowerCase()) {
            items.push({
              id: item.id.toString(),
              owner: item.owner,
              price: ethers.utils.formatEther(item.price),
              listed: item.listed,
              name: item.name,
            });
          }
        }
        setItems(items);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleRelist = async (itemId) => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);

    try {
      const tx = await contract.relistItem(itemId);
      await tx.wait();
      // Update the item list after relisting
      const updatedItems = items.map(item => 
        item.id === itemId ? { ...item, listed: true } : item
      );
      setItems(updatedItems);
    } catch (error) {
      console.error('Error relisting item:', error);
    }
  };

  return (
    <main className={styles.main}>
      <nav>
        <ul style={navStyle}>
          <li><a href="/" style={navLinkStyle}>Home</a></li>
          <li><a href="/sellpage" style={navLinkStyle}>List an Item</a></li>
          <li><a href="/ownedpage" style={navLinkStyle}>My Listings</a></li>
        </ul>
      </nav>
      <div className={styles.content}>
        <h1 className={styles.title}>Owned Items</h1>
        {loading ? (
          <p>Loading items...</p>
        ) : items.length === 0 ? (
          <p>No items owned.</p>
        ) : (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <div key={index} className={styles.card}>
                <h2 className={styles.itemName}>{item.name}</h2>
                <p className={styles.itemDetail}><strong>Price:</strong> {item.price} ETH</p>
                <p className={styles.itemDetail}><strong>Owner Address:</strong> {item.owner}</p>
                <p className={styles.itemDetail}><strong>ID:</strong> {item.id}</p>
                <p className={styles.itemDetail}><strong>Listed:</strong> {item.listed ? 'Yes' : 'No'}</p>
                {!item.listed && (
                  <button onClick={() => handleRelist(item.id)} style={buttonStyle}>RELIST</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const navStyle = {
  listStyleType: 'none',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px',
  margin: 0,
  backgroundColor: '#333',
  color: 'white',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
};

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '10px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

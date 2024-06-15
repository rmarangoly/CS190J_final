"use client";  // This directive tells Next.js that this component should be treated as a client component

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { payUser, getItemCount } from '../utils/payment';
import styles from './page.module.css';
import { navStyle, navLinkStyle } from '../app/navbarStyles';
import Image from 'next/image';



const marketplaceAddress = '0x9e5B612221A362B79F3D1A1B7bB10561e64c04B4';
const marketplaceABI = [
  "function items(uint256) view returns (uint256 id, string memory name, address owner, uint256 price, bool listed)"
];


export default function Home() {
  const [messages, setMessages] = useState([]);;
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      if (!window.ethereum) return;
      const itemCount = await getItemCount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(marketplaceAddress, marketplaceABI, provider);

      const items = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await contract.items(i);
        console.log("OWNER: " + item.owner);
        items.push({
          id: item.id.toString(),
          owner: item.owner,
          price: ethers.utils.formatEther(item.price),
          listed: item.listed,
          name: item.name
        });
      }
      setItems(items);
    };

    fetchItems();
  }, []);
  
  const handleBuy = async (item) => {
    
    try{
      
      //success = true;
      
      setStatus('Processing...');
      const newOwner = await payUser(item.id, item.price);
      setMessages(prevMessages => [...prevMessages, newOwner ? 'Purchase successful!' : 'Purchase failed.']);

      if (newOwner) {
        // Refresh the item list after purchase
        const updatedItems = items.map(i => {
          if (i.id === item.id) {
            return { ...i, owner: newOwner, listed: false }; // Update with your address
          }
          return i;
        });
        setItems(updatedItems);
        
      }
      //setMessage("Purchase Successful");
    }
    catch (e){
      
      setMessage(e.name)
    }
  };
  return (
    <main className={styles.main}>
      <nav>
        <ul style={navStyle}>
          <li><Image src="/market.jpg" alt="Market" width={100} height={100} /></li>
          <li><a href="/" style={navLinkStyle}>Home</a></li>
          <li><a href="/sellpage" style={navLinkStyle}>List an Item</a></li>
          <li><a href="/ownedpage" style={navLinkStyle}>My Listings</a></li>
        </ul>
      </nav>
      <div className={styles.content}>
        <h1 className={styles.title}>Items for Sale</h1>
        {items.length === 0 ? (
          <p>No items owned.</p>
        ) : (
          <div className={styles.grid}>
            {items.filter(item => item.listed).map((item, index) => (
              <div key={index} className={styles.card}>
                <h2 className={styles.itemName}>{String(item.name)}</h2>
                <p className={styles.itemDetail}><strong>Price:</strong> {item.price} ETH</p>
                <p className={styles.itemDetail}><strong>Owner Address:</strong> {String(item.owner).substring(0,5) + "..."}</p>
                <p className={styles.itemDetail}><strong>ID:</strong> {item.id}</p>
                <button className={styles.buyButton} onClick={async () => await handleBuy(item)}>Buy</button>
                {messages[index]}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

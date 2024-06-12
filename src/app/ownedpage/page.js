// src/app/OwnedPage.js
import styles from '../page.module.css';
const ownedItems = [
  { name: 'Vintage Watch', price: 250, ownerAddress: '0x123456789abcdef', id: 1 },
  { name: 'Leather Wallet', price: 75, ownerAddress: '0x123456789abcdef', id: 2 },
  { name: 'Bluetooth Speaker', price: 150, ownerAddress: '0x123456789abcdef', id: 3 },
  { name: 'Smartphone', price: 600, ownerAddress: '0x123456789abcdef', id: 4 },
  { name: 'Gaming Console', price: 300, ownerAddress: '0x123456789abcdef', id: 5 }
];
// { ownedItems }
//add this as a parameter when props set up
export default function OwnedPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Owned Items</h1>
      {ownedItems.length === 0 ? (
        <p>No items owned.</p>
      ) : (
        <div className={styles.grid}>
          {ownedItems.map((item, index) => (
            <div key={index} className={styles.card}>
              <h2 className={styles.itemName}>{item.name}</h2>
              <p className={styles.itemDetail}><strong>Price:</strong> ${item.price}</p>
              <p className={styles.itemDetail}><strong>Owner Address:</strong> {item.ownerAddress}</p>
              <p className={styles.itemDetail}><strong>ID:</strong> {item.id}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

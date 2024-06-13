import styles from '../page.module.css';

const ownedItems = [
  { name: 'Vintage Watch', price: 250, ownerAddress: '0x123456789abcdef', id: 1 },
  { name: 'Leather Wallet', price: 75, ownerAddress: '0x123456789abcdef', id: 2 },
  { name: 'Bluetooth Speaker', price: 150, ownerAddress: '0x123456789abcdef', id: 3 },
  { name: 'Smartphone', price: 600, ownerAddress: '0x123456789abcdef', id: 4 },
  { name: 'Gaming Console', price: 300, ownerAddress: '0x123456789abcdef', id: 5 }
];

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
  zIndex: 1000
};

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '10px'
};

export default function OwnedPage() {
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
      </div>
    </main>
  );
}

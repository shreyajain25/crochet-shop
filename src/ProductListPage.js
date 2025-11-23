import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import PaymentModal from "./PaymentModal";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { user, logout } = useAuth();

  useEffect(() => {
    async function fetchProducts() {
      const productsCol = collection(db, "products");
      const productSnapshot = await getDocs(productsCol);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    }
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Products</h2>
        <div>
          <span style={{ marginRight: 10 }}>{user?.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <div
        style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              width: 200,
              borderRadius: 4,
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: 120, objectFit: "cover" }}
            />
            <h3 style={{ fontSize: 16 }}>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => setSelectedProduct(p)}>Buy</button>
          </div>
        ))}
        {selectedProduct && (
          <PaymentModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductListPage;

// src/PaymentModal.js
import React, { useEffect, useState } from "react";
import api from "./api"; // Axios instance with backend URL & auth token

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const PaymentModal = ({ product, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Failed to load Razorpay SDK. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // Create order on your backend. Amount in paise.
      const res = await api.post("/api/payments/create-order", {
        amount: product.price * 100,
        currency: "INR",
      });

      const { orderId, amount, currency, razorpayKey } = res.data;

      const options = {
        key: razorpayKey, // Your Razorpay Key from backend
        amount,
        currency,
        name: "Crochet Shop",
        description: product.name,
        order_id: orderId,
        handler: (response) => {
          // Process success payment here, optionally verify on backend
          alert("Payment successful!");
          onClose();
        },
        modal: {
          ondismiss: () => onClose(),
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert("Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.4)",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ background: "#fff", padding: 20, borderRadius: 5, minWidth: 280 }}>
        <h3>Pay ₹{product.price} for {product.name}</h3>
        <button onClick={handlePay} disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
        <button onClick={onClose} disabled={loading} style={{ marginLeft: 10 }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;

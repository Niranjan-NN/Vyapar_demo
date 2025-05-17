import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaSearch, FaShoppingCart, FaBell, FaUserCircle, FaHome } from "react-icons/fa";
import styles from "./Cart.module.css"; // Import the CSS module
import axios from "axios";

const Cart = () => {
  const { increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const [items, setCartItems] = useState([]);
  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:3000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}` // Add token to the request headers
          }
        });
  
        setCartItems(response.data.items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);
  
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
  };

  const handlePurchaseMore = () => {
    navigate("/home");
  };

  const handleRemoveFromCart = async (productId) => {
  try {
    const token = localStorage.getItem('token');

    // First, remove item
    await axios.delete(`http://localhost:3000/api/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Then, re-fetch the cart to ensure products are populated
    const response = await axios.get('http://localhost:3000/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setCartItems(response.data.items); // This includes fully populated product info
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};


  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Vyapar</div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for grocery, vegetables, spices..."
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="navbar-icons">
          <FaHome onClick={() => navigate("/home")} />
          <FaShoppingCart onClick={() => navigate("/cart")} />
          <FaBell />
          <FaUserCircle onClick={() => navigate("/profile")} />
        </div>
      </nav>

      <div className={styles.cartItems}>
        <h1>Your Cart</h1>
        {items.map((item, index) => {
  // Skip if product is missing (optional but safe)
  if (!item.product) {
    <p>Your Cart is Empty</p>
  };

  return (
    <div key={item.product._id || index} className={styles.cartItem}>
      <img
        src={`http://localhost:3000/uploads/${item.product.image}`}
        alt={item.product.title}
        className={styles.cartItemImage}
      />
      <div className={styles.cartItemDetails}>
        <h3>{item.product.title}</h3>
        <p>Quantity: {item.quantity} Kg</p>
        <p>Price: ₹{(item.product.price * item.quantity).toFixed(2)}</p>
        <div className={styles.quantityControls}>
          <button onClick={() => decreaseQuantity(item.product._id)} className={styles.quantityBtn}>-</button>
          <button onClick={() => increaseQuantity(item.product._id)} className={styles.quantityBtn}>+</button>
        </div>
        <button onClick={() => handleRemoveFromCart(item.product._id)} className={styles.removeBtn}>Remove</button>
      </div>
    </div>
  );
})}




      </div>

      <div className={styles.cartTotals}>
        <h2>Cart totals</h2>
        <p>Subtotal: ₹{calculateTotal().toFixed(2)}</p>
        <p>Shipping: ₹8.00</p>
        <p>Tax: ₹0.72</p>
        <p>Total: ₹{(calculateTotal() + 8.00 + 0.72).toFixed(2)}</p>
        <button onClick={handlePurchaseMore} className={styles.purchaseMoreBtn}>Purchase More</button>
        <button onClick={handleCheckout} className={styles.checkoutBtn}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;

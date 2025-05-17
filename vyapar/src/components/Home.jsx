import { FaUserCircle, FaShoppingCart, FaBell, FaSearch, FaHome } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [category, setCategory] = useState("fruits");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const SERVER_URL = "http://localhost:3000"; // Update to match your backend URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/products`);
        console.log(res.data.product); // Log the response to check products
        setProducts(res.data.product); // Assuming the response has "product" field containing products
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const cat = product.category?.toLowerCase() || "others"; // Default to "others" if category is missing
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Vyapar</div>
        <div className="navbar-search">
          <input type="text" placeholder="Search for grocery, vegetables, spices..." className="search-input" />
          <FaSearch className="search-icon" />
        </div>
        <div className="navbar-icons">
          <FaHome onClick={() => navigate("/home")} />
          <FaShoppingCart onClick={handleCartClick} />
          <FaBell />
          <FaUserCircle onClick={() => navigate("/profile")} />
        </div>
      </nav>

      {/* Banner */}
      <div className="banner">
        <div className="banner-content">
          <h1 className="banner-title">From farm to your kitchen</h1>
          <p className="banner-subtitle">
            Discover the freshest and finest groceries delivered quickly and conveniently.
          </p>
          <button className="shop-now-button">Shop Now</button>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="category-buttons">
        {["fruits", "vegetables", "greens", "grocery"].map((cat) => (
          <button
            key={cat}
            className={`category-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Category Title */}
      <h2 className="category-heading">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>

      {/* Products */}
      <div className="product-grid">
        {productsByCategory[category] && productsByCategory[category].length > 0 ? (
          productsByCategory[category].map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleProductClick(product._id)}
            >
              {/* Discount Badge (optional) */}
              <div className="product-discount">Limited Offer</div>

              {/* Product Image */}
              <img
  src={`${SERVER_URL}/uploads/${product.image}`} // <- only ONE slash between uploads and filename
  alt={product.title}
  style={{ width: "150px", height: "150px", objectFit: "cover" }}
/>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-name">{product.title}</h3>
                <p className="product-price">₹{product.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;

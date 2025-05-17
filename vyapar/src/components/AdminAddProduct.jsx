import React, { useRef, useState } from 'react';
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminAddProduct.css';

const AdminAddProduct = () => {
    const descriptionRef = useRef(null);
    const stackRef = useRef(null);
    const navigate = useNavigate();

    // Use state for form inputs
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [offerDescription, setOfferDescription] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (event.target.id === 'description') {
                stackRef.current.focus();
            }
        }
    };

    const handleLogout = () => {
        navigate("/"); // Navigate to the signup page on logout
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        console.log("Selected file:", file); // Log to check if image is selected
    };
    

    const handleAddProduct = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("adminToken");
    
        const formData = new FormData();
        formData.append("title", productName);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("offerDescription", offerDescription);
        formData.append("image", image); // File upload
    
        try {
            const response = await axios.post(
                "http://localhost:3000/api/addProduct",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        // ❌ Don't manually set content-type here!
                        // Axios will set it as multipart/form-data with the correct boundary
                    },
                }
            );
            alert(response.data.message || "Product added successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add product.");
            console.error("Product Add Error:", error);
        }
    };
    
    

    return (
        <div>
            <header>
                <nav className="navbar">
                    <div className="navbar-brand">Vyapar / Admin</div>
                    <div className="navbar-search">
                        <input type="text" placeholder="Search for grocery, vegetables, spices..." className="search-input" />
                        <FaSearch className="search-icon" />
                    </div>
                    <div className="navbar-icons">
                        <FaSignOutAlt onClick={handleLogout} className="logout-icon" title="Logout" />
                    </div>
                </nav>
            </header>

            <main>
                <div className="sidebar">
                    <ul>
                        <li><Link to="/adminview">View product</Link></li>
                        <li><Link to="/admindetials">View details</Link></li>
                        <li><a href="#">Sales graph</a></li>
                    </ul>
                </div>

                <div className="content">
                    <h2>Add product</h2>
                    <form onSubmit={handleAddProduct}>
                        <label htmlFor="product-name">Product Name</label>
                        <input
                            type="text"
                            id="product-name"
                            name="product-name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />

                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />

                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select category</option>
                            <option value="fruits">Fruits</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="greens">Greens</option>
                            <option value="grocery">Grocery</option>
                        </select>

                        <label htmlFor="offer-description">Offer Description (Optional)</label>
                        <input
                            type="text"
                            id="offer-description"
                            name="offer-description"
                            value={offerDescription}
                            onChange={(e) => setOfferDescription(e.target.value)}
                        />

                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            ref={descriptionRef}
                            onKeyDown={handleKeyDown}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>

                        <label htmlFor="stock">Stock</label>
                        <input
                            type="number"
                            id="stack"
                            name="stack"
                            ref={stackRef}
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />

                        <label htmlFor="image">Product Image</label>
                        <input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    onChange={handleImageChange}
    required
/>


                        <button type="submit" className="add-btn">Add</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AdminAddProduct;

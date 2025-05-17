import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import '../styles/AdminViewProduct.css';

const AdminViewProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        title: '',
        description: '',
        price: '',
        offerDescription: '',
        category: '',
        stock: '',
        image: null
    });

    const token = localStorage.getItem("adminToken"); // Assuming token is stored here

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/products');
            setProducts(res.data.product);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleEditClick = (product) => {
        setEditedProduct({ ...product, image: null }); // Reset image for new upload
        setEditingProductId(product._id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setEditedProduct((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSaveClick = async () => {
        try {
            const formData = new FormData();
            Object.entries(editedProduct).forEach(([key, value]) => {
                if (value !== null) formData.append(key, value);
            });

            await axios.put(
                `http://localhost:3000/api/updateProduct/${editingProductId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setEditingProductId(null);
            fetchProducts();
        } catch (error) {
            console.error("Error updating product", error);
        }
    };

    const handleCancelClick = () => {
        setEditingProductId(null);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/deleteProduct/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Are you sure you want to delete this product?');
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    return (
        <div className="home-container">
            <header>
                <nav className="navbar">
                    <div className="navbar-brand">Vyapar / Admin</div>
                    <div className="navbar-search">
                        <input type="text" placeholder="Search..." className="search-input" />
                        <FaSearch className="search-icon" />
                    </div>
                    <div className="navbar-icons">
                        <FaSignOutAlt onClick={handleLogout} className="logout-icon" title="Logout" />
                    </div>
                </nav>
            </header>

            <main>
                <aside className="sidebar">
                    <ul>
                        <li><Link to="/adminproduct">Add products</Link></li>
                        <li><Link to="/adminview">View product</Link></li>
                        <li><a href="#">View details</a></li>
                        <li><a href="#">Sales graph</a></li>
                    </ul>
                </aside>

                <section className="content">
                    <h2>View Products</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Offer</th>
                                <th>Stock</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.offerDescription}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.category}</td>
                                    <td><img src={`http://localhost:3000/${product.image}`} alt={product.title} width="50" /></td>
                                    <td>
                                        <button onClick={() => handleEditClick(product)}>Edit</button>
                                        <button onClick={() => handleDeleteClick(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {editingProductId && (
                        <div className="edit-form">
                            <h3>Edit Product</h3>
                            <form>
                                <label>Title: <input name="title" value={editedProduct.title} onChange={handleInputChange} /></label>
                                <label>Description: <input name="description" value={editedProduct.description} onChange={handleInputChange} /></label>
                                <label>Price: <input name="price" type="number" value={editedProduct.price} onChange={handleInputChange} /></label>
                                <label>Offer: <input name="offerDescription" value={editedProduct.offerDescription} onChange={handleInputChange} /></label>
                                <label>Stock: <input name="stock" type="number" value={editedProduct.stock} onChange={handleInputChange} /></label>
                                <label>Category: <input name="category" value={editedProduct.category} onChange={handleInputChange} /></label>
                                <label>Image: <input type="file" onChange={handleFileChange} /></label>
                            </form>
                            <button onClick={handleSaveClick}>Save</button>
                            <button onClick={handleCancelClick}>Cancel</button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminViewProduct;

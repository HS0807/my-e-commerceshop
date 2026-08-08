"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // Add Product states
    const [showAdd, setShowAdd] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    // Edit Product states
    const [showEdit, setShowEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editPrice, setEditPrice] = useState("");

    // GET ALL PRODUCTS
    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await fetch("https://dummyjson.com/products?limit=100");
            const data = await response.json();
            console.log("All Products:", data);
            setProducts(data.products);
        } catch (error) {
            console.log("Products Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ADD PRODUCT
    const handleAddProduct = async () => {
        if (!title || !price) {
            alert("Please enter product title and price");
            return;
        }

        try {
            const response = await fetch("https://dummyjson.com/products/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: title,
                        price: Number(price),
                        category: category,
                        thumbnail:
                            image ||
                            "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
                    }),
                }
            );

            const data = await response.json();
            console.log("Added Product:", data);
            setProducts((prev) => [data, ...prev]);
            setTitle("");
            setPrice("");
            setCategory("");
            setImage("");

            setShowAdd(false);
            alert("Product Added Successfully");
        } catch (error) {
            console.log("Add Product Error:", error);
        }
    };

    // DELETE PRODUCT
    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();
            console.log("Deleted Product:", data);
            setProducts((prev) => prev.filter((product) => product.id !== id));
            alert("Product Deleted Successfully");
        } catch (error) {
            console.log("Delete Product Error:", error);
        }
    };

    // OPEN EDIT
    const handleEditOpen = (product) => {
        setEditId(product.id);
        setEditTitle(product.title);
        setEditPrice(product.price);
        setShowEdit(true);
    };

    // UPDATE PRODUCT
    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${editId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: editTitle,
                        price: Number(editPrice),
                    }),
                }
            );

            const data = await response.json();
            console.log("Updated Product:", data);
            setProducts((prev) => prev.map((product) => product.id === editId ? {
                ...product,
                title: data.title,
                price: data.price,
            }
                : product
            )
            );
            setShowEdit(false);
            alert("Product Updated Successfully");
        } catch (error) {
            console.log("Update Product Error:", error);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );


    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold">Products</h1>
                    <p className="text-gray-500 mt-2">Manage all your products</p>
                </div>
                <button onClick={() => setShowAdd(true)}
                    className="bg-black text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800">
                    <FaPlus /> <span>Add Product</span> </button>
            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-8">
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none focus:border-black"
                    />
                </div>
            </div>

            {/* PRODUCTS */}
            {loading ? (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full border-4 border-[#C78A2B] border-t-transparent"></div>
                </div>
            ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                            {/* IMAGE */}
                            <div className="h-60 bg-gray-100 flex items-center justify-center p-4">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* PRODUCT INFO */}
                            <div className="p-5">
                                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                                <h2 className="font-semibold text-lg line-clamp-2 min-h-14">{product.title}</h2>
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-xl font-bold text-[#803f14]">${product.price}</p>
                                    <span className="text-yellow-500">⭐ {product.rating}</span>
                                </div>

                                {/* BUTTONS */}
                                <div className="grid grid-cols-2 gap-3 mt-5">
                                    <button onClick={() => handleEditOpen(product)}
                                        className="bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800">
                                        <FaEdit /> <span>Edit</span> </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600">
                                        <FaTrash /> <span>Delete</span> </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ADD PRODUCT MODAL */}
            {showAdd && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
                    <div className="bg-white w-full max-w-lg rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Add Product</h2>
                            <button onClick={() => setShowAdd(false)} className="text-gray-500 text-xl"> ✕ </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="font-medium mb-2">Product Title</p>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter product title"
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>
                            <div>
                                <p className="font-medium mb-2">Price</p>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Enter price"
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>
                            <div>
                                <p className="font-medium mb-2">Category</p>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Enter category"
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>
                            <div>
                                <p className="font-medium mb-2">Image URL</p>
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    placeholder="Enter image URL"
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>
                            <button onClick={handleAddProduct} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">Add Product</button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT PRODUCT MODAL */}
            {showEdit && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
                    <div className="bg-white w-full max-w-lg rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Update Product</h2>
                            <button onClick={() => setShowEdit(false)} className="text-gray-500 text-xl"> ✕ </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="font-medium mb-2">Product Title</p>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>
                            <div>
                                <p className="font-medium mb-2">Price</p>
                                <input
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) =>
                                        setEditPrice(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>
                            <button onClick={handleUpdate} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">Update Product</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
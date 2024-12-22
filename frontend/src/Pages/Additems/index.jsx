import React,{useState} from 'react'
import Navbar from '../../Component/Navbar'
import Card from '../../Component/Card'
import axios from 'axios';
import {navigate} from 'react-router-dom'

export default function Additems() {
    const [status, setStatus] = useState('');
    const [product, setProduct] = useState({
        name: '',
        description: '',
        amount: '',
        brand: '',
        images: [{ imageUrl: '' }],
        category: [''],
        rating: '',
      });
      const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
      };
    
      const handleImageChange = (e, index) => {
        const newImages = [...product.images];
        newImages[index].imageUrl = e.target.value;
        setProduct({ ...product, images: newImages });
      };
      const handleCategoryChange = (e, index) => {
        const newCategory = [...product.category];
        newCategory[index] = e.target.value;
        setProduct({ ...product, category: newCategory });
      };
      const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:5000/product/addproduct",{name,discription,amount,brand,images,category,rating});
            if(response.data.status === "ok"){
                setStatus('Added Succesfully');
                navigate('/')
            }
            else{
                setStatus('Product alredy exist');
            }

        }
        catch(error){
            setStatus('Error adding Product')
        }
      }

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="text"
            name="amount"
            value={product.amount}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={product.images[0].imageUrl}
            onChange={(e) => handleImageChange(e, 0)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={product.category[0]}
            onChange={(e) => handleCategoryChange(e, 0)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <input
            type="text"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  )
}

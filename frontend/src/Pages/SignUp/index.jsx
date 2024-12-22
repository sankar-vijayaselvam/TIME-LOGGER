import React, { useState } from 'react'
import {toast , ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { svedio } from '../../assets';

export default function SignUp() {
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('')
    const [password,setPassword]=useState('');
    const [confirmPassword,setCpass]=useState('');
    const navigate=useNavigate();

    const validation= ()=>{
        if(!email||!password||!confirmPassword){
            toast.error("All Fields are required");
            return false;
        }

        const emailregex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if(!emailregex.test(email)){
            toast.error("Invalid Email Format");
            return false;
        }
        const phoneRegex=/^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            toast.error('Phone number must be 10 digits.');
            return false;
        }
        if(password.length<6){
            toast.error("Password must be at leat 6 charaters")
            return false;
        }
        if(password !== confirmPassword){
            toast.error("Passwords do not match.")
        }
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validation()) return;
        try {
            const response = await axios.post("http://localhost:5000/users/signup", {email,phone, password });
            if (response.data.status === "ok") {
                toast.success("Signup Successful!");
                navigate('/login'); // Redirect to login page after successful signup
            } else {
                toast.error(response.data.message || "Signup failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during signup.");
        }
    };
  return (
    <>
       <div className='flex flex-col md:flex-row items-center gap-10 justify-between w-full h-screen'>
            <ToastContainer />
            <div className="form-box w-full md:w-1/3 flex flex-col items-end gap-10 p-4">
                <form className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setCpass(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-400 text-white p-2 rounded-lg">
                        Sign Up
                    </button>

                    <div className="mt-4 text-center">
                        <p>
                            Already have an account?{' '}
                            <span className="text-blue-600 cursor-pointer" onClick={() => { navigate('/login') }}>Log in</span>
                        </p>
                    </div>

            </form>
        </div>
        <div className='img w-full md:w-2/3 flex justify-center'>
                <video src={svedio} autoPlay loop muted alt="BikeLogin" className='w-full md:w-3/4 object-contain' />
            </div>
       </div>
        
    </>
  )
}

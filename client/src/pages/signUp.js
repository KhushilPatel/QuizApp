// pages/register.js
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
const router=useRouter()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {

    e.preventDefault();
    try {
      const response=await axios.post("http://localhost:4000/api/auth/register",formData)
      console.log("response",response)
      alert('Registration successful!');
      if (response.data) {
        setFormData({
          firstName: "",
          lastName:"",
          email: "",
          password: "",
        });
        router.push('/signIn')
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0D1321] ">
        <div className="flex absolute m-14 ml-24 mt-24">
          <img src="/images/logo.png" alt="Logo" className="w-30 h-12 " />
        </div>
      <div className='flex'>
      <div className="w-1/2 bg-[#0D1321] p-4 flex flex-col justify-center ml-20">
        
  
        <p className="text-[#C5D86D] mb-4 font-bold text-2xl">Create your account and start using QuizWiz!</p>
        <h2 className="text-3xl font-bold text-[#FFFFFF] mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label className="block text-[#FFFFFF]">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-2 p-2   rounded bg-transparent border-white border-2 text-white"
                required
              />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-[#FFFFFF]">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-2 p-2   rounded bg-transparent border-white border-2 text-white"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[#FFFFFF]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-2   rounded bg-transparent border-white border-2 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#FFFFFF]">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-2   rounded bg-transparent border-white border-2 text-white"
              required
            />
          </div>

          <button type="submit" className="w-[160px] bg-white text-black p-2 rounded mt-5">
            Sign Up
          </button>
        </form>
      </div>
      <div className="w-1/2 flex items-center justify-center relative">
        <div className="inset-y-0 flex items-center rounded-lg ">
          <img
            src="/images/SignUp.jpg"
            alt="Sign Up"
            className="object-cover max-h-[85%] max-w-[85%] mx-auto rounded-3xl"
          />
        </div>
      </div>
      </div>
    </div>
  );
}

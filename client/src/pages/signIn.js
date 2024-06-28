
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router=useRouter()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
console.log("response",response)
      const res_data = await response.json();
      if (response.ok) {
        router.push("admin/dashboard");
        setUser({
          email: "",
          password: "",
        });
        toast.success("Login Successful");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("login", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0D1321] ">
        <div className="flex absolute m-14 ml-24 mt-24">
          <img src="/images/logo.png" alt="Logo" className="w-30 h-12 " />
        </div>
      <div className='flex'>
        <div className="w-1/2 bg-[#0D1321] p-4 flex flex-col justify-center mt-5 ml-20">
          <p className="text-[#C5D86D] mb-4 font-bold text-2xl">Welcome back to QuizWiz!</p>
          <h2 className="text-3xl font-bold text-[#FFFFFF] mb-6">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#FFFFFF]">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-2 rounded bg-transparent border-white border-2 text-white"
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
                className="w-full mt-2 p-2 rounded bg-transparent border-white border-2 text-white"
                required
              />
            </div>
            <button type="submit" className="w-[160px] bg-white text-black p-2 rounded mt-5">
              Sign In
            </button>
          </form>
          <p className="text-[#C5D86D] mt-4">Don't have an account? <Link href="/signUp" className="text-[#FFFFFF] underline">Create Account</Link></p>
        </div>
        <div className="w-1/2 flex items-center justify-center relative">
          <div className="inset-y-0 flex items-center rounded-lg">
            <img
              src="/images/signUp.jpg"
              alt="Sign In"
              className="object-cover max-h-[85%] max-w-[85%] mx-auto rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

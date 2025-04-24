// pages/register.js
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          dateOfBirth: "",
          gender: "",
        });
        router.push("/signIn");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#0D1321] to-[#1D2D44]">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="mb-4 text-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-32 h-auto mx-auto mb-2"
            />
            <h1 className="text-3xl font-bold text-white mb-1">
              Create Account
            </h1>
            <p className="text-[#C5D86D] text-base">
              Join QuizWiz and start learning
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-white text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-[#1D2D44] border border-[#3D5A80] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition duration-200"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-white text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-[#1D2D44] border border-[#3D5A80] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition duration-200"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-[#1D2D44] border border-[#3D5A80] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-[#1D2D44] border border-[#3D5A80] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition duration-200 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-white text-sm font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-[#1D2D44] border border-[#3D5A80] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition duration-200"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-white text-sm font-medium">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-[#1D2D44] border border-[#3D5A80] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition duration-200"
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                href="/signIn"
                className="text-[#C5D86D] hover:text-[#A4C639] font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1321] to-transparent z-10"></div>
        <img
          src="/images/SignUp.jpg"
          alt="Sign Up"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
          <h2 className="text-2xl font-bold mb-2">
            Start Your Learning Journey
          </h2>
          <p className="text-base opacity-90">
            Create an account to access our interactive quizzes and track your
            progress.
          </p>
        </div>
      </div>
    </div>
  );
}

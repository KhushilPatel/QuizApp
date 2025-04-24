import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useUser } from "@/context/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

export default function SignIn() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (user?.isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    }
  }, [user, loading, router]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const res_data = await response.json();
      if (response.ok) {
        Cookies.set("auth", res_data.token, { expires: 7, path: "/" });
        setFormData({
          email: "",
          password: "",
        });
        toast.success("Login Successful");
        router.reload();
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0D1321] to-[#1D2D44]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#C5D86D]"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0D1321] to-[#1D2D44]">
        <div className="text-white text-xl">Redirecting...</div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-[#C5D86D] text-base">
              Sign in to continue to QuizWiz
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                href="/signUp"
                className="text-[#C5D86D] hover:text-[#A4C639] font-medium"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1321] to-transparent z-10"></div>
        <img
          src="/images/signUp.jpg"
          alt="Sign In"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
          <h2 className="text-2xl font-bold mb-2">QuizWiz Learning Platform</h2>
          <p className="text-base opacity-90">
            Join thousands of learners who are already improving their knowledge
            with our interactive quizzes.
          </p>
        </div>
      </div>
    </div>
  );
}

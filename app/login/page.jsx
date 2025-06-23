"use client";
import Logo from "../components/Logo";
import { ArrowLeft } from "lucide-react";
import SocialLoginButton from "../components/SocialLoginButton";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import axios from "axios";
import {useUser} from '../context/UserContext'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
const {setUser } = useUser();


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!regex.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    if (isEmailValid && password) {
      // Handle login logic
      try {
        const response = await axios.post("/api/login", {
          email,
          password,
        });
        if (response.status === 200) {
          setUser({name:response.data.user.name,email:response.data.user.email})
          setEmail("");
          setPassword("");
          window.location.href = "/allitems";
          console.log(response)
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("User not found");
        } else if (error.response && error.response.status === 401) {
          alert("Invalid password");
        } else {
          alert(error.response?.data?.message || "Something went wrong");
        }
      }
      console.log("Login with:", email, password);
    }

  };
  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Left sidebar with logo and tagline */}
        <div className="hidden md:flex md:w-2/5 lg:w-1/3 flex-col bg-[#131313] p-10 justify-center items-center">
          {/* <div className="mb-8">
          <Logo />
        </div> */}
          <h2 className="text-3xl font-bold text-white mb-4">
            Manage your Passwords
          </h2>
          <h2 className="text-3xl font-bold text-white mb-8">
            with GhostSafe.
          </h2>
          <div className="w-16 h-1 bg-[#202020] rounded-full mb-8"></div>
        </div>

        {/* Main content area */}
        <div
          className="w-full md:w-3/5 lg:w-2/3 p-4 sm:p-8 md:p-12 flex flex-col"
          style={{ backgroundColor: "var(--background)" }}
        >
          {/* Login form */}
          <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Log in to your account
              </h1>
              <p className="text-[#b0b0b0]">Connect to GhostSafe with:</p>
            </div>

            {/* Social login options */}
            {/* <div className="grid grid-cols-2 gap-3 mb-6">
            <SocialLoginButton provider="Google" icon="google" isLast={true} />
            <SocialLoginButton provider="GitHub" icon="github" />
            <SocialLoginButton provider="Microsoft" icon="microsoft" />
            <SocialLoginButton provider="Hasura" icon="hasura" />
          </div> */}

            {/* OR divider */}
            {/* <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-[#b0b0b0]"></div>
            <span className="px-4 text-sm text-[#b0b0b0] font-medium">OR LOG IN WITH YOUR EMAIL</span>
            <div className="flex-grow h-px bg-[#b0b0b0]"></div>
          </div> */}

            {/* Email login form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
                error={emailError}
                required
              />

              <PasswordField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* <div className="flex justify-end">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Forgot Password?
                </a>
              </div> */}

              <button
                type="submit"
                className="w-full border-1 border-[#2b2b2b] hover:bg-[#1f1f1f] text-[#B0B0B0] font-medium py-3 rounded-md transition-colors duration-200"
              >
                Log in
              </button>
            </form>

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <p className="text-[#B0B0B0]">
                New to GhostSafe ?{" "}
                <a
                  href="/signup"
                  className="text-blue-500 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign up for an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

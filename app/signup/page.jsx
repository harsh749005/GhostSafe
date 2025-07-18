"use client";
import { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [progress, setProgress] = useState(false);

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
        const response = await axios.post("/api/signup", {
          username,
          email,
          password,
        });
        // alert(response.data.message);
        setProgress(true);
        setEmail("");
        setPassword("");
        setUsername("");
        setTimeout(()=>{
          window.location.href = "/login";
        },3000)
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("User already exists");
        } else {
          alert(error.response?.data?.message || "Something went wrong");
        }
      }
      console.log("Signup with:", email, password);
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
                Create your account
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
                label="Name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
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

              <button
                type="submit"
                className="cursor-pointer w-full border-1 border-[#2b2b2b] hover:bg-[#1f1f1f] text-[#B0B0B0] font-medium py-3 rounded-md transition-colors duration-200"
              >
                {progress ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress size="30px" />
                  </Box>
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            {/* Terms and conditions */}

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <p className="text-[#B0B0B0]">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
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

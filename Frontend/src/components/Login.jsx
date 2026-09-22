import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaLock,
  FaGem,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // =========================
  // VALIDATION
  // =========================

  const validate = () => {
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // LOGIN
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email: loginData.email.trim(),
          password: loginData.password,
        }
      );

      console.log("Login successful:", response.data);

      // =========================
      // SAVE JWT
      // =========================

      localStorage.setItem(
        "token",
        response.data.token
      );

      // =========================
      // SAVE USER
      // =========================

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      // =========================
      // GO TO HOME
      // =========================

      navigate("/", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message
      );

      const message =
        error.response?.data?.message ||
        "Unable to login. Please try again.";

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        bg-[#0a0a0a]
        text-white
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-12
        overflow-hidden
      "
    >

      {/* =================================
          BACKGROUND GLOW
      ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -right-40
          w-[550px]
          h-[350px]
          rounded-full
          bg-white/[0.04]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          w-[500px]
          h-[350px]
          rounded-full
          bg-white/[0.03]
          blur-3xl
        "
      />

      {/* =================================
          LOGIN CONTAINER
      ================================= */}

      <div className="relative z-10 w-full max-w-md">

        {/* =================================
            LOGIN CARD
        ================================= */}

        <div
          className="
            bg-gradient-to-br
            from-[#1c1c1f]
            via-[#111113]
            to-[#080808]
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            shadow-[0_25px_70px_rgba(0,0,0,0.6)]
            p-7
            sm:p-9
          "
        >

          {/* =================================
              LOGO
          ================================= */}

          <div className="flex justify-center mb-6">

            <div
              className="
                w-16
                h-16
                bg-white
                text-black
                rounded-full
                flex
                items-center
                justify-center
                shadow-[0_10px_35px_rgba(255,255,255,0.12)]
                transition
                duration-300
                hover:scale-105
              "
            >
              <FaGem className="text-2xl" />
            </div>

          </div>

          {/* =================================
              HEADING
          ================================= */}

          <div className="text-center mb-8">

            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-500
                mb-3
              "
            >
              EliteStore
            </p>

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                tracking-tight
                text-white
              "
            >
              Welcome Back
            </h1>

            <p className="text-gray-400 mt-2">
              Sign in to continue shopping
            </p>

          </div>

          {/* =================================
              FORM
          ================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* =================================
                EMAIL
            ================================= */}

            <div>

              <label
                htmlFor="email"
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-300
                  mb-2
                "
              >
                Email Address
              </label>

              <div className="relative">

                <FaUser
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    pointer-events-none
                  "
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`
                    w-full
                    bg-[#18191b]
                    text-white
                    placeholder:text-gray-600
                    border
                    ${
                      errors.email
                        ? "border-red-500"
                        : "border-white/10"
                    }
                    rounded-2xl
                    px-12
                    py-4
                    outline-none
                    transition-all
                    duration-300
                    hover:border-white/20
                    focus:border-white/40
                    focus:ring-4
                    focus:ring-white/5
                  `}
                />

              </div>

              {errors.email && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.email}
                </p>
              )}

            </div>

            {/* =================================
                PASSWORD
            ================================= */}

            <div>

              <label
                htmlFor="password"
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-300
                  mb-2
                "
              >
                Password
              </label>

              <div className="relative">

                {/* LOCK ICON */}

                <FaLock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    pointer-events-none
                  "
                />

                {/* PASSWORD INPUT */}

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`
                    w-full
                    bg-[#18191b]
                    text-white
                    placeholder:text-gray-600
                    border
                    ${
                      errors.password
                        ? "border-red-500"
                        : "border-white/10"
                    }
                    rounded-2xl
                    px-12
                    pr-12
                    py-4
                    outline-none
                    transition-all
                    duration-300
                    hover:border-white/20
                    focus:border-white/40
                    focus:ring-4
                    focus:ring-white/5
                  `}
                />

                {/* SHOW / HIDE PASSWORD */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-white
                    transition
                    duration-200
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.password}
                </p>
              )}

            </div>

            {/* =================================
                LOGIN BUTTON
            ================================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-white
                text-black
                py-4
                rounded-2xl
                font-bold
                text-lg
                shadow-[0_10px_30px_rgba(255,255,255,0.08)]
                transition-all
                duration-300
                hover:bg-gray-200
                hover:scale-[1.01]
                active:scale-[0.99]
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:scale-100
              "
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>

          {/* =================================
              FOOTER
          ================================= */}

          <div className="mt-7 text-center">

            <p className="text-sm text-gray-500">
              Secure access to your EliteStore account
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
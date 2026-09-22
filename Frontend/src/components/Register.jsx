import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGem,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // HANDLE FORM SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      setServerError("");
      setSuccessMessage("");

      const response = await api.post("/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccessMessage(
        response.data.message || "Account created successfully! Redirecting..."
      );

      // Smooth transition to login after 1.5s
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(
        "Register error:",
        error.response?.data || error.message
      );

      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setServerError(message);
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
          REGISTER CONTAINER
      ================================= */}
      <div className="relative z-10 w-full max-w-md">
        {/* =================================
            REGISTER CARD
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
          <div className="text-center mb-7">
            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-500
                mb-2
              "
            >
              EliteStore
            </p>

            <h1
              className="
                text-2xl
                sm:text-3xl
                font-bold
                tracking-tight
                text-white
              "
            >
              Create Account
            </h1>

            <p className="text-gray-400 text-sm mt-2">
              Join EliteStore for an exclusive experience
            </p>
          </div>

          {/* =================================
              SUCCESS NOTIFICATION
          ================================= */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-sm">
              <FaCheckCircle className="text-lg shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* =================================
              SERVER ERROR BANNER
          ================================= */}
          {serverError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              {serverError}
            </div>
          )}

          {/* =================================
              FORM
          ================================= */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FULL NAME */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
              >
                Full Name
              </label>

              <div
                className="
                  flex
                  items-center
                  bg-[#151517]
                  border
                  border-white/10
                  rounded-2xl
                  px-4
                  py-3.5
                  focus-within:border-white/30
                  focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                  transition-all
                "
              >
                <FaUser className="text-gray-500 mr-3 text-base shrink-0" />
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-gray-500
                    text-sm
                    sm:text-base
                  "
                />
              </div>

              {errors.name && (
                <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
              >
                Email Address
              </label>

              <div
                className="
                  flex
                  items-center
                  bg-[#151517]
                  border
                  border-white/10
                  rounded-2xl
                  px-4
                  py-3.5
                  focus-within:border-white/30
                  focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                  transition-all
                "
              >
                <FaEnvelope className="text-gray-500 mr-3 text-base shrink-0" />
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-gray-500
                    text-sm
                    sm:text-base
                  "
                />
              </div>

              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="register-password"
                className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
              >
                Password
              </label>

              <div
                className="
                  flex
                  items-center
                  bg-[#151517]
                  border
                  border-white/10
                  rounded-2xl
                  px-4
                  py-3.5
                  focus-within:border-white/30
                  focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                  transition-all
                "
              >
                <FaLock className="text-gray-500 mr-3 text-base shrink-0" />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-gray-500
                    text-sm
                    sm:text-base
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-white transition-colors duration-200 ml-2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
              >
                Confirm Password
              </label>

              <div
                className="
                  flex
                  items-center
                  bg-[#151517]
                  border
                  border-white/10
                  rounded-2xl
                  px-4
                  py-3.5
                  focus-within:border-white/30
                  focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                  transition-all
                "
              >
                <FaLock className="text-gray-500 mr-3 text-base shrink-0" />
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-gray-500
                    text-sm
                    sm:text-base
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-500 hover:text-white transition-colors duration-200 ml-2"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                mt-6
                bg-white
                text-black
                py-3.5
                rounded-2xl
                font-bold
                text-base
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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* =================================
              FOOTER / LOGIN LINK
          ================================= */}
          <div className="mt-7 text-center border-t border-white/10 pt-5">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white font-semibold hover:underline transition-all"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

import { useState } from "react";

import {
  FaBoxOpen,
  FaImage,
  FaRupeeSign,
  FaStar,
  FaCheck,
} from "react-icons/fa";

import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    image: "",
    price: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});

  /* ================================
     HANDLE INPUT
  ================================= */

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  /* ================================
     VALIDATION
  ================================= */

  const validate = () => {
    const newErrors = {};

    if (!product.title.trim()) {
      newErrors.title = "Product Name is required";
    } else if (product.title.trim().length < 5) {
      newErrors.title = "Minimum 5 characters required";
    } else if (product.title.trim().length > 100) {
      newErrors.title = "Maximum 100 characters allowed";
    }

    if (!product.image.trim()) {
      newErrors.image = "Image URL is required";
    } else {
      try {
        new URL(product.image);
      } catch {
        newErrors.image = "Enter a valid image URL";
      }
    }

    if (!product.price) {
      newErrors.price = "Price is required";
    } else if (Number(product.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!product.rating) {
      newErrors.rating = "Rating is required";
    } else if (
      Number(product.rating) < 0 ||
      Number(product.rating) > 5
    ) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================================
     SUBMIT
  ================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/products",
        {
          title: product.title.trim(),
          image: product.image.trim(),
          price: Number(product.price),
          rating: Number(product.rating),
        }
      );

      alert("Product Added Successfully!");

      setProduct({
        title: "",
        image: "",
        price: "",
        rating: "",
      });

      setErrors({});
    } catch (error) {
      console.log("Add Product Error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Failed to Add Product"
        );
      } else {
        alert("Cannot connect to backend server.");
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden">

      {/* ==================================
          BACKGROUND GLOW
      ================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -right-40
          w-[500px]
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

      {/* ==================================
          MAIN CONTENT
      ================================== */}

      <div className="relative z-10 px-5 sm:px-8 lg:px-12 py-12">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ==================================
              FORM
          ================================== */}

          <div
            className="
              bg-gradient-to-br
              from-[#1c1c1f]
              via-[#111113]
              to-[#090909]
              border
              border-white/10
              rounded-3xl
              p-6
              sm:p-10
              shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            "
          >

            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-400
              "
            >
              EliteStore
            </p>

            <h1
              className="
                text-4xl
                sm:text-5xl
                font-bold
                mt-3
                tracking-tight
              "
            >
              Add Product
            </h1>

            <p className="text-gray-400 mt-3 mb-10">
              Create a premium product for your collection.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

              {/* TITLE */}

              <div>

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    font-semibold
                    mb-3
                    text-gray-200
                  "
                >
                  <FaBoxOpen />
                  Product Name
                </label>

                <input
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  placeholder="MacBook Air"
                  className="
                    w-full
                    bg-[#18191b]
                    border
                    border-white/10
                    rounded-2xl
                    px-5
                    py-4
                    text-white
                    outline-none
                    placeholder:text-gray-600
                    focus:border-white/40
                    focus:bg-[#1b1c1e]
                    transition
                  "
                />

                {errors.title && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.title}
                  </p>
                )}

              </div>

              {/* IMAGE */}

              <div>

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    font-semibold
                    mb-3
                    text-gray-200
                  "
                >
                  <FaImage />
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="
                    w-full
                    bg-[#18191b]
                    border
                    border-white/10
                    rounded-2xl
                    px-5
                    py-4
                    text-white
                    outline-none
                    placeholder:text-gray-600
                    focus:border-white/40
                    focus:bg-[#1b1c1e]
                    transition
                  "
                />

                {errors.image && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.image}
                  </p>
                )}

              </div>

              {/* PRICE */}

              <div>

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    font-semibold
                    mb-3
                    text-gray-200
                  "
                >
                  <FaRupeeSign />
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="79999"
                  className="
                    w-full
                    bg-[#18191b]
                    border
                    border-white/10
                    rounded-2xl
                    px-5
                    py-4
                    text-white
                    outline-none
                    placeholder:text-gray-600
                    focus:border-white/40
                    focus:bg-[#1b1c1e]
                    transition
                  "
                />

                {errors.price && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.price}
                  </p>
                )}

              </div>

              {/* RATING */}

              <div>

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    font-semibold
                    mb-3
                    text-gray-200
                  "
                >
                  <FaStar />
                  Rating
                </label>

                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  value={product.rating}
                  onChange={handleChange}
                  placeholder="4.8"
                  className="
                    w-full
                    bg-[#18191b]
                    border
                    border-white/10
                    rounded-2xl
                    px-5
                    py-4
                    text-white
                    outline-none
                    placeholder:text-gray-600
                    focus:border-white/40
                    focus:bg-[#1b1c1e]
                    transition
                  "
                />

                {errors.rating && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.rating}
                  </p>
                )}

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="
                  w-full
                  bg-white
                  text-black
                  py-4
                  rounded-2xl
                  font-bold
                  text-lg
                  flex
                  items-center
                  justify-center
                  gap-3
                  hover:bg-gray-200
                  hover:scale-[1.01]
                  transition-all
                  duration-300
                "
              >
                <FaCheck />
                Submit Product
              </button>

            </form>

          </div>

          {/* ==================================
              LIVE PREVIEW
          ================================== */}

          <div
            className="
              bg-gradient-to-br
              from-[#1c1c1f]
              via-[#111113]
              to-[#090909]
              border
              border-white/10
              rounded-3xl
              p-6
              sm:p-10
              flex
              items-center
              justify-center
              shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            "
          >

            <div className="w-full max-w-lg">

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-gray-400
                  mb-3
                "
              >
                Preview
              </p>

              <h2 className="text-3xl font-bold mb-8">
                Product Preview
              </h2>

              {/* PREVIEW CARD */}

              <div
                className="
                  bg-[#18191b]
                  border
                  border-white/10
                  rounded-3xl
                  overflow-hidden
                  shadow-[0_15px_40px_rgba(0,0,0,0.4)]
                "
              >

                <div
                  className="
                    h-80
                    bg-[#202123]
                    m-4
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                  "
                >

                  {product.image ? (
                    <img
                      src={product.image}
                      alt="Preview"
                      className="
                        w-full
                        h-full
                        object-contain
                        p-8
                      "
                    />
                  ) : (
                    <div className="text-center">

                      <FaImage
                        className="
                          text-5xl
                          text-gray-700
                          mx-auto
                        "
                      />

                      <p className="text-gray-600 mt-3">
                        Image Preview
                      </p>

                    </div>
                  )}

                </div>

                <div className="p-6">

                  <h3
                    className="
                      text-2xl
                      font-bold
                      min-h-[64px]
                    "
                  >
                    {product.title || "Product Name"}
                  </h3>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mt-6
                    "
                  >

                    <span
                      className="
                        text-2xl
                        font-bold
                        text-emerald-500
                      "
                    >
                      ₹ {product.price || "0"}
                    </span>

                    <span
                      className="
                        flex
                        items-center
                        gap-2
                        border
                        border-white/10
                        px-4
                        py-2
                        rounded-full
                        text-gray-300
                      "
                    >
                      <FaStar className="text-yellow-400" />

                      {product.rating || "0"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddProduct;
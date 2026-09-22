import axios from "axios";
import { useEffect, useState } from "react";

import {
  FaSearch,
  FaFilter,
  FaDatabase,
  FaGlobe,
} from "react-icons/fa";

import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [source, setSource] = useState("mongodb");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================
     FETCH PRODUCTS
  ========================================= */

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      setProducts([]);

      try {
        let response;

        if (source === "mongodb") {
          response = await axios.get(
            "http://localhost:3000/products"
          );
        } else {
          response = await axios.get(
            "https://fakestoreapi.com/products"
          );
        }

        setProducts(response.data);
      } catch (err) {
        console.error("Product Fetch Error:", err);

        if (source === "mongodb") {
          setError(
            "Unable to load MongoDB products. Please check your backend server."
          );
        } else {
          setError(
            "Unable to load FakeStore products. Please try again."
          );
        }

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [source]);

  /* =========================================
     SEARCH PRODUCTS
  ========================================= */

  const filteredProducts = products.filter((product) =>
    product.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  /* =========================================
     CHANGE SOURCE
  ========================================= */

  const handleSourceChange = (newSource) => {
    setSource(newSource);
    setSearch("");
    setError("");
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white">

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="px-5 sm:px-8 lg:px-12 pt-12">

        <div
          className="
            relative
            w-full
            min-h-[300px]
            rounded-3xl
            overflow-hidden
            border
            border-white/10
            bg-gradient-to-br
            from-[#1c1c1f]
            via-[#111113]
            to-[#050505]
            px-8
            sm:px-12
            lg:px-16
            py-12
            flex
            items-center
            shadow-[0_20px_60px_rgba(0,0,0,0.4)]
          "
        >

          {/* Background Glow */}

          <div
            className="
              absolute
              -right-32
              -top-40
              w-[550px]
              h-[300px]
              rounded-full
              bg-white/[0.04]
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -left-40
              -bottom-40
              w-[450px]
              h-[250px]
              rounded-full
              bg-white/[0.03]
              blur-3xl
            "
          />

          {/* Hero Content */}

          <div className="relative z-10 max-w-3xl">

            <p
              className="
                text-xs
                uppercase
                tracking-[0.35em]
                text-gray-400
                mb-4
              "
            >
              EliteStore Collection
            </p>

            <h1
              className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-bold
                tracking-tight
                text-white
              "
            >
              Premium Products
            </h1>

            <p
              className="
                mt-5
                text-gray-300
                text-base
                sm:text-lg
                max-w-2xl
                leading-8
              "
            >
              Explore premium products from MongoDB and
              FakeStore with a modern shopping experience.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          CONTROLS
      ===================================== */}

      <section className="px-5 sm:px-8 lg:px-12 mt-10">

        <div className="w-full">

          {/* SOURCE BUTTONS */}

          <div className="flex flex-wrap items-center gap-3">

            {/* MongoDB */}

            <button
              type="button"
              onClick={() => handleSourceChange("mongodb")}
              className={`
                flex
                items-center
                gap-3
                px-6
                py-3
                rounded-full
                font-semibold
                border
                transition-all
                duration-300

                ${
                  source === "mongodb"
                    ? `
                      bg-white
                      text-black
                      border-white
                      shadow-[0_0_25px_rgba(255,255,255,0.15)]
                    `
                    : `
                      bg-[#171719]
                      text-gray-300
                      border-white/10
                      hover:border-white/30
                      hover:bg-[#222225]
                    `
                }
              `}
            >
              <FaDatabase />

              MongoDB Products
            </button>


            {/* FakeStore */}

            <button
              type="button"
              onClick={() => handleSourceChange("fakestore")}
              className={`
                flex
                items-center
                gap-3
                px-6
                py-3
                rounded-full
                font-semibold
                border
                transition-all
                duration-300

                ${
                  source === "fakestore"
                    ? `
                      bg-white
                      text-black
                      border-white
                      shadow-[0_0_25px_rgba(255,255,255,0.15)]
                    `
                    : `
                      bg-[#171719]
                      text-gray-300
                      border-white/10
                      hover:border-white/30
                      hover:bg-[#222225]
                    `
                }
              `}
            >
              <FaGlobe />

              FakeStore Products
            </button>

          </div>


          {/* =================================
              SEARCH + FILTER
          ================================= */}

          <div className="flex gap-4 mt-6">

            {/* Search */}

            <div
              className="
                flex
                items-center
                flex-1
                bg-[#151517]
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                focus-within:border-white/30
                focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                transition-all
              "
            >

              <FaSearch className="text-gray-500 mr-4" />

              <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-white
                  placeholder:text-gray-500
                "
              />

            </div>


            {/* Filter */}

            <button
              type="button"
              className="
                hidden
                sm:flex
                items-center
                gap-3
                px-7
                rounded-2xl
                border
                border-white/10
                bg-[#151517]
                text-gray-300
                hover:bg-white
                hover:text-black
                transition-all
                duration-300
              "
            >
              <FaFilter />

              Filter
            </button>

          </div>

        </div>

      </section>


      {/* =====================================
          PRODUCTS HEADER
      ===================================== */}

      <section className="px-5 sm:px-8 lg:px-12 mt-14">

        <div
          className="
            flex
            items-end
            justify-between
            border-b
            border-white/10
            pb-6
          "
        >

          {/* LEFT */}

          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-400
                mb-3
              "
            >
              Collection
            </p>

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-white
              "
            >
              {source === "mongodb"
                ? "MongoDB Products"
                : "FakeStore Products"}
            </h2>

          </div>


          {/* PRODUCT COUNT */}

          <p
            className="
              text-sm
              text-gray-400
              font-medium
            "
          >
            {filteredProducts.length} Products
          </p>

        </div>

      </section>


      {/* =====================================
          PRODUCTS SECTION
      ===================================== */}

      <section className="px-5 sm:px-8 lg:px-12 py-8">

        {/* =================================
            LOADING
        ================================= */}

        {loading && (
          <div className="min-h-[300px] flex items-center justify-center">

            <div className="text-center">

              <div
                className="
                  w-12
                  h-12
                  border-4
                  border-white/20
                  border-t-white
                  rounded-full
                  animate-spin
                  mx-auto
                "
              />

              <p className="mt-5 text-gray-400">
                Loading products...
              </p>

            </div>

          </div>
        )}


        {/* =================================
            ERROR
        ================================= */}

        {!loading && error && (
          <div
            className="
              min-h-[300px]
              flex
              items-center
              justify-center
              border
              border-red-500/20
              rounded-3xl
              bg-red-500/5
            "
          >

            <div className="text-center px-6">

              <h3
                className="
                  text-xl
                  font-semibold
                  text-red-400
                "
              >
                Unable to Load Products
              </h3>

              <p className="text-red-300 mt-2">
                {error}
              </p>

              <button
                type="button"
                onClick={() => handleSourceChange(source)}
                className="
                  mt-6
                  px-6
                  py-3
                  rounded-full
                  bg-white
                  text-black
                  font-semibold
                  hover:bg-gray-200
                  transition
                "
              >
                Try Again
              </button>

            </div>

          </div>
        )}


        {/* =================================
            EMPTY STATE
        ================================= */}

        {!loading &&
          !error &&
          filteredProducts.length === 0 && (

            <div
              className="
                min-h-[300px]
                flex
                items-center
                justify-center
                border
                border-white/10
                rounded-3xl
                bg-[#111113]
              "
            >

              <div className="text-center">

                <h3
                  className="
                    text-xl
                    font-semibold
                    text-white
                  "
                >
                  No Products Found
                </h3>

                <p className="text-gray-400 mt-2">
                  Try another search or add a product.
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="
                      mt-5
                      px-5
                      py-2
                      rounded-full
                      bg-white
                      text-black
                      font-semibold
                      hover:bg-gray-200
                      transition
                    "
                  >
                    Clear Search
                  </button>
                )}

              </div>

            </div>
          )}


        {/* =================================
            PRODUCT GRID
        ================================= */}

        {!loading &&
          !error &&
          filteredProducts.length > 0 && (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-6
              "
            >

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />

              ))}

            </div>

          )}

      </section>

    </div>
  );
}

export default Home;
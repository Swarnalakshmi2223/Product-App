import { NavLink, useNavigate } from "react-router-dom";

import {
  FaGem,
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  // =========================
  // LOGOUT
  // =========================
const handleLogout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");

  navigate("/login");
};

  return (
    <header className="w-full px-3 sm:px-5 lg:px-8 pt-3">

      <nav
        className="
          w-full
          min-h-20
          px-4
          sm:px-7
          lg:px-12
          py-4
          flex
          items-center
          justify-between
          gap-4
          bg-black
          border
          border-white/10
          rounded-2xl
          shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        "
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <NavLink
          to="/"
          className="
            flex
            items-center
            gap-3
            shrink-0
          "
        >

          {/* Logo Icon */}

          <div
            className="
              w-11
              h-11
              sm:w-12
              sm:h-12
              rounded-full
              bg-white
              text-black
              flex
              items-center
              justify-center
              shadow-[0_0_25px_rgba(255,255,255,0.15)]
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]
            "
          >
            <FaGem className="text-lg sm:text-xl" />
          </div>

          {/* Brand */}

          <div className="hidden sm:block">

            <h1
              className="
                text-lg
                sm:text-xl
                font-bold
                tracking-tight
                text-white
              "
            >
              EliteStore
            </h1>

            <p className="text-xs text-gray-400">
              Premium Collection
            </p>

          </div>

        </NavLink>


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
          "
        >

          {/* =================================================
              HOME
          ================================================= */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              `
                flex
                items-center
                justify-center
                gap-2
                px-4
                sm:px-6
                py-2.5
                sm:py-3
                rounded-full
                border
                font-semibold
                text-sm
                sm:text-base
                transition-all
                duration-300

                ${
                  isActive
                    ? `
                      bg-white
                      text-black
                      border-white
                      shadow-[0_0_20px_rgba(255,255,255,0.25)]
                    `
                    : `
                      text-white
                      border-white/20
                      hover:border-white
                      hover:bg-white/10
                    `
                }
              `
            }
          >

            <FaHome />

            <span className="hidden sm:inline">
              Home
            </span>

          </NavLink>


          {/* =================================================
              ADD PRODUCT
          ================================================= */}

          <NavLink
            to="/add-product"
            className={({ isActive }) =>
              `
                flex
                items-center
                justify-center
                gap-2
                px-4
                sm:px-6
                py-2.5
                sm:py-3
                rounded-full
                border
                font-semibold
                text-sm
                sm:text-base
                transition-all
                duration-300

                ${
                  isActive
                    ? `
                      bg-white
                      text-black
                      border-white
                      shadow-[0_0_20px_rgba(255,255,255,0.25)]
                    `
                    : `
                      text-white
                      border-white/20
                      hover:border-white
                      hover:bg-white/10
                    `
                }
              `
            }
          >

            <FaPlusCircle />

            <span className="hidden sm:inline">
              Add Product
            </span>

          </NavLink>


          {/* =================================================
              LOGOUT
          ================================================= */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-4
              sm:px-6
              py-2.5
              sm:py-3
              rounded-full
              border
              border-red-500/40
              text-red-400
              font-semibold
              text-sm
              sm:text-base
              transition-all
              duration-300
              hover:bg-red-500
              hover:text-white
              hover:border-red-500
              hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]
            "
          >

            <FaSignOutAlt />

            <span className="hidden sm:inline">
              Logout
            </span>

          </button>

        </div>

      </nav>

    </header>
  );
}

export default Navbar;
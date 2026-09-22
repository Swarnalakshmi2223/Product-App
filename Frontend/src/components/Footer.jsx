import {
  FaGem,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";


function Footer() {

  return (

    <footer
      className="
        mt-20
        border-t
        border-white/10
        bg-[#0b0c0d]
      "
    >

      <div className="px-5 sm:px-8 lg:px-12 py-14">

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-12
          "
        >

          {/* ============================
              BRAND
          ============================ */}

          <div>

            <div className="flex items-center gap-2">

              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                "
              >
                <FaGem />
              </div>


              <h2 className="text-2xl font-bold">
                EliteStore
              </h2>

            </div>


            <p
              className="
                mt-5
                text-gray-500
                leading-7
                max-w-sm
              "
            >
              Discover premium products with
              elegant design, seamless shopping
              experience, and modern technology.
            </p>

          </div>


          {/* ============================
              QUICK LINKS
          ============================ */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Quick Links
            </h3>


            <div className="flex flex-col gap-4">

              <NavLink
                to="/"
                className="text-gray-500 hover:text-white transition"
              >
                Home
              </NavLink>


              <NavLink
                to="/add-product"
                className="text-gray-500 hover:text-white transition"
              >
                Add Product
              </NavLink>


              <NavLink
                to="/"
                className="text-gray-500 hover:text-white transition"
              >
                Products
              </NavLink>

            </div>

          </div>


          {/* ============================
              SOCIAL
          ============================ */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Connect
            </h3>


            <div className="flex gap-3">

              <a
                href="https://github.com/Swarnalakshmi2223"
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#191a1c]
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:text-white
                  hover:border-white/30
                  transition
                "
              >
                <FaGithub className="text-xl" />
              </a>


              <a
                href="https://www.linkedin.com/in/swarnalakshmi-perumal/"
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#191a1c]
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:text-white
                  hover:border-white/30
                  transition
                "
              >
                <FaLinkedin className="text-xl" />
              </a>


              <a
                href="https://www.instagram.com/swarnalakshmi_perumal/"
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#191a1c]
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:text-white
                  hover:border-white/30
                  transition
                "
              >
                <FaInstagram className="text-xl" />
              </a>


              <a
                href="mailto:swarnalak4@gmail.com"
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#191a1c]
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:text-white
                  hover:border-white/30
                  transition
                "
              >
                <FaEnvelope className="text-xl" />
              </a>

            </div>

          </div>


          {/* ============================
              NEWSLETTER
          ============================ */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Newsletter
            </h3>


            <div
              className="
                flex
                items-center
                bg-[#191a1c]
                border
                border-white/10
                rounded-2xl
                p-1
              "
            >

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  px-4
                  text-sm
                  text-white
                  placeholder-gray-600
                  min-w-0
                "
              />


              <button
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-200
                  transition
                "
              >
                <FaArrowRight />
              </button>

            </div>

          </div>

        </div>


        {/* DIVIDER */}

        <div
          className="
            border-t
            border-white/10
            mt-12
            pt-7
          "
        >

          <p
            className="
              text-center
              text-gray-600
              text-sm
              flex
              items-center
              justify-center
              gap-2
            "
          >
            © 2026 EliteStore | Built with React &
            Tailwind CSS

            <FaHeart className="text-gray-500" />

          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
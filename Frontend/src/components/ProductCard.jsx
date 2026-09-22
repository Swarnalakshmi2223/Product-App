import { FaStar, FaArrowRight } from "react-icons/fa";

function ProductCard({ product }) {

  const rating =
    typeof product.rating === "object"
      ? product.rating?.rate
      : product.rating;

  return (
    <div
      className="
        group
        bg-[#151617]
        border border-white/10
        rounded-3xl
        overflow-hidden
        shadow-[0_15px_40px_rgba(0,0,0,0.35)]
        hover:border-white/25
        hover:-translate-y-2
        transition-all
        duration-500
      "
    >

      {/* IMAGE */}
      <div
        className="
          relative
          h-72
          bg-[#1d1e20]
          m-4
          rounded-2xl
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >

        {/* Elite Badge */}
        <span
          className="
            absolute
            top-3
            right-3
            z-10
            bg-black
            border border-white/20
            text-white
            text-xs
            px-3
            py-1
            rounded-full
          "
        >
          Elite
        </span>


        <img
          src={product.image}
          alt={product.title}
          className="
            w-full
            h-full
            object-contain
            p-8
            group-hover:scale-110
            transition-transform
            duration-500
          "
        />

      </div>


      {/* CONTENT */}
      <div className="px-5 pb-5">

        <h2
          className="
            text-lg
            font-bold
            text-white
            leading-7
            min-h-[56px]
            line-clamp-2
          "
        >
          {product.title}
        </h2>


        {/* PRICE + RATING */}
        <div
          className="
            flex
            items-center
            justify-between
            mt-5
          "
        >

          <span
            className="
              text-2xl
              font-bold
              text-emerald-500
            "
          >
            ₹ {product.price}
          </span>


          <span
            className="
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-full
              border
              border-white/10
              bg-black/30
              text-gray-200
              text-sm
              font-semibold
            "
          >
            <FaStar className="text-yellow-400" />

            {rating || "0"}
          </span>

        </div>


        {/* BUTTON */}
        <button
          className="
            w-full
            mt-6
            py-3
            rounded-full
            bg-black
            border border-white/10
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-3
            hover:bg-white
            hover:text-black
            transition-all
            duration-300
          "
        >
          View Product

          <FaArrowRight
            className="
              group-hover:translate-x-1
              transition-transform
            "
          />

        </button>

      </div>

    </div>
  );
}

export default ProductCard;
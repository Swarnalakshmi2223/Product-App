import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";


/* =========================================
   PROTECTED ROUTE
========================================= */

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
}


/* =========================================
   APP
========================================= */

function App() {

  return (

       <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0d0d0f] to-[#151515]">
    <Routes>

      {/* =====================================
          LOGIN PAGE
          No Navbar
      ===================================== */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* =====================================
          HOME PAGE
      ===================================== */}

      <Route
        path="/"
        element={
          <ProtectedRoute>

        <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0d0d0f] to-[#18181b]">
              <Navbar />

              <Home />

            </div>

          </ProtectedRoute>
        }
      />


      {/* =====================================
          ADD PRODUCT PAGE
      ===================================== */}

      <Route
        path="/add-product"
        element={
          <ProtectedRoute>

            <div className="min-h-screen bg-gray-100">

              <Navbar />

              <AddProduct />

            </div>

          </ProtectedRoute>
        }
      />


      {/* =====================================
          UNKNOWN URL
      ===================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
   </div>
  );
}

export default App;
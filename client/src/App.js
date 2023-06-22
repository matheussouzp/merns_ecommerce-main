import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Galery from "./components/Galery";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Sobre from "./pages/Sobre";
import Politica from "./pages/Politica";
import Cookie from "js-cookie";
import { GlobalContext } from "./GlobalContext/GlobalContext";
import { useContext } from "react";

import React, { useEffect } from "react";
import axios from "axios";
import AddNewProduct from "./pages/AddNewProduct";
import ProductDetails from "./pages/ProductDetails";
import Registrar from "./pages/Registrar";
import CadastrarProduto from "./pages/CadastrarProduto";
import Login2 from "./pages/Login2";

function App() {
  //console.log(Cookie.get("jwt_token"));

  const navigate = useNavigate();

  const { IsLoggedIn } = useContext(GlobalContext);

  //console.log(LoginStatus);

  const token = Cookie.get("jwt_token");
  useEffect(() => {
    axios
      .post(
        //"http://localhost:5000/cliente/validar",
        { token },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (!res.data.status) {
          Cookie.remove("jwt_token");
          navigate("/login");
          IsLoggedIn(false);
        } else {
          IsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(`Request err: ${err}`);
      });
  }, [navigate]);

  return (
    <div className="App">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <Galery />
       
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="addnewproduct" element={<AddNewProduct />} />
        <Route path="produto/detalhes/:productid" element={<ProductDetails />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="politica" element={<Politica />} />
        <Route path="registrar" element={<Registrar />} />
        <Route path="login2" element={<Login2 />} />
        <Route path="novoproduto" element={<CadastrarProduto />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import React, { useContext, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import Cookie from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isClienteValido, setIsClienteValido] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [nav, setNav] = useState(false);
  const [refreshNavbar, setRefreshNavbar] = useState(false);

  const token = Cookie.get("jwt_token");
  
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/cliente/validar",
        { token },
        { withCredentials: true }
      )
      .then((res) => {
        //console.log(res);

        if (!res.data.status) {
          Cookie.remove("jwt_token");
          setIsClienteValido(false);
          setIsAdmin(false);
          IsLoggedIn(false);
        } else {
          setIsClienteValido(true);
          setIsAdmin(res.data.admin); 
          IsLoggedIn(true);
          IsAdmin(res.data.admin)
        }
      })
      .catch((err) => {
        console.log(`Request err: ${err}`);
      });
  }, [navigate]);

  const { LoginStatus, IsLoggedIn, cart, IsAdmin, clearCart } = useContext(GlobalContext);
 


  const navHandler = () => {
    setNav(!nav);
  };

  const logoutHandler = () => {
    Cookie.remove("jwt_token");
    setIsClienteValido(false);
    setIsAdmin(false);
    IsLoggedIn(false);
    IsAdmin(false);
    clearCart();
    setRefreshNavbar(prevValue => !prevValue); // Atualiza a chave para remontar o componente
  };

 

  
  return (
    <div className="w-full h-25 bg-[#000300] flex justify-between items-center">
      <Link to="/">
      <h1 className="text-white font-bold md:text-4xl sm:3xl text-xl p-3">
        E-PET
        <FontAwesomeIcon icon={faPaw} />
      </h1>
      </Link>
      <ul className="hidden md:flex p-3">
      {isClienteValido && (
      <Link to="/perfil">
          <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
            Perfil
          </li>
        </Link>
         )}
        <Link to="/">
          <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
            Home
          </li>
        </Link>
        {isClienteValido && (
        <Link to="cart">
          <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
            Carrinho <span className="px-1 py-0.4 bg-orange-400 rounded-full ">{cart.length}</span>
          </li>
        </Link>
        )}

        {LoginStatus ? (
          <>
            {/* <Link to="/">
              <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                Profile
              </li>
            </Link> */}
            {isAdmin && (
              <Link to="novoproduto">
                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                  Cadastrar Produto
                </li>
              </Link>
             )}
            <Link to="/">
              <li
                onClick={logoutHandler}
                className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer"
              >
                Sair
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                Entrar
              </li>
            </Link>
            <Link to="registrar">
              <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                Registrar
              </li>
            </Link>
          </>
        )}
      </ul>

      <div className="md:hidden">
        {nav ? (
          <AiOutlineClose
            onClick={navHandler}
            className="text-white text-4xl px-2"
          />
        ) : (
          <AiOutlineMenu
            onClick={navHandler}
            className="text-white text-4xl px-2 "
          />
        )}
      </div>

      <div
        className={
          nav
            ? `md:hidden fixed top-0 left-0 h-[100%] w-60 bg-[#000300] ease-in-out duration-300`
            : `hidden `
        }
      >
        <h1 className="text-white text-left font-bold md:text-4xl sm:3xl text-xl p-3">
          E-COMMERCE
        </h1>
        <ul className=" flex flex-col text-left p-3">
          <Link to="/">
            {" "}
            <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="cart">
            <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
              Cart
            </li>
          </Link>

          {LoginStatus ? (
            <>
              {/* <Link to="/">
                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                  Profile
                </li>
              </Link> */}
              {isClienteValido && isAdmin && (
              <Link to="addnewproduct">
                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                  Add New Product
                </li>
              </Link>
             )}
              <Link to="/">
                <li
                  onClick={logoutHandler}
                  className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer"
                >
                  Logout
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                  Login
                </li>
              </Link>
              <Link to="registrar">
                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                  Register
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

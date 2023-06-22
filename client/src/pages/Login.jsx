import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import './login_formulary.css';



const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputs);
    axios
      .post(
        "http://localhost:5000/cliente/login",
        { ...inputs },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (!res.data.created) {
          if (res.data.error_type === 0) {
            toast.error(res.data.error[0].msg, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (res.data.error_type === 1) {
            toast.error(res.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }

        if (res.data.created) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(`Request error: ${err}`);
      });
    // usando axios para conectar como o backend
  };

  return (
    <div className="w-full flex justify-center items-center" id="login_form">
      <form
        className=" mt-30 bg-white p-4 shadow-md border rounded my-5 py-3 "
        onSubmit={submitHandler}
      >
        <h2 className="text-center w-full p-3 text-gray-500 text-xl font-bold ">
          Faça o login
        </h2>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            placeholder="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>

        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="senha">
            Senha
          </label>
          <input
            type="password"
            placeholder="senha"
            id="senha"
            onChange={onChangeHandler}
            value={inputs.senha}
            name="senha"
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
          />
        </div>

        <div className="flex justify-between items-center my-3 mb-5">
          <button className="text-white font-bold bg-blue-500 py-2 px-3 border rounder hover:bg-blue-700">
            Entrar
          </button>
          <a href="/registrar" className=" text-blue-500">
            Cadastrar
          </a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;

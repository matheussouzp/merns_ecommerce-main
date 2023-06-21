import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import './registrar_style.css'




const Registrar = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    cpf: "",
    cartaoNome: "",
    cartaoNumero: "",
    cvc: "",
    email: "",
    senha: "",
    imagem: "",


  });

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
        "http://localhost:5000/cliente/",
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
    //we will use axios to connect to the backend
  };
  return (
    <div className="w-full flex justify-center items-center" id="forms">
      <form
        className="bg-white p-4 shadow-md border rounded my-5 py-3"
        onSubmit={submitHandler}
      >
        <h2 className="text-center w-full p-3 text-gray-500 text-xl font-bold">
          Registrar conta
        </h2>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="nome">
            Nome
          </label>
          <input
            type="text"
            placeholder="Nome"
            id="nome"
            name="nome"
            onChange={onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="endereco">
            Endereço
          </label>
          <input
            type="text"
            placeholder="Endereço"
            id="endereco"
            name="endereco"
            onChange={onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="telefone">
            Telefone
          </label>
          <input
            type="number"
            placeholder="Telefone"
            id="telefone"
            name="telefone"
            onChange={onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="cpf">
            CPF
          </label>
          <input
            type="number"
            placeholder="CPF"
            id="cpf"
            name="cpf"
            onChange={onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="cartaoNome">
            Nome do Cartão
          </label>
          <input
            type="text"
            placeholder="Nome do Cartão"
            id="cartaoNome"
            name="cartaoNome"
            onChange={onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="cartaoNumero">
            Número do Cartão
          </label>
          <input
            type="number"
            placeholder="Número do Cartão"
            id="cartaoNumero"
            name="cartaoNumero"
            onChange={onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="cvc">
            CVC
          </label>
          <input
            type="number"
            placeholder="CVC"
            id="cvc"
            name="cvc"
            onChange={onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
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
            placeholder="Senha"
            id="senha"
            name="senha"
            onChange={onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="imagem">
            Foto de perfil
          </label>
          <input
            type="file"
            id="imagem"
            name="imagem"
            accept="image/*"
            onChange={onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="flex flex-col justify-between items-center my-3 mb-5">
          <Link to={`/`} >
          <button className="text-white font-bold bg-blue-500 py-2 px-3 border rounder hover:bg-blue-700">
            Registrar
          </button>
          </Link>
          {/* <Link to="/login" className="text-blue-500"><p>Already have an account</p></Link> */}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Registrar;
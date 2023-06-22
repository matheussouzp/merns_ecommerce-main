import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import './registrar_style.css'
import { GlobalContext } from "../GlobalContext/GlobalContext";





const Registrar = () => {
  const history = useNavigate();
  const [categorias, setCategorias] = useState([]);

  const { LoginStatus, IsLoggedIn, cart, AdminStatus } = useContext(GlobalContext);

  if(!AdminStatus){
    history('/');
  }

console.log("admin"  + AdminStatus);


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
        "http://localhost:5000/categoria/",
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

  const getCategorias = (e) => {
    e.preventDefault();

    console.log("teste")
    
    axios
      .get(
        "http://localhost:5000/categoria/",
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
    <>
    {AdminStatus && (
      <div className="w-full flex justify-center items-center" id="forms">

      <form
        className="bg-white p-4 shadow-md border rounded my-5 py-3"
        onSubmit={() => submitHandler}
      >
        <h2 className="text-center w-full p-3 text-gray-500 text-xl font-bold">
          Cadastrar Produto
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
            onChange={() => onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="endereco">
            Descrição
          </label>
          <input
            type="text"
            placeholder="Endereço"
            id="endereco"
            name="endereco"
            onChange={() => onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="telefone">
            Preço
          </label>
          <input
            type="number"
            placeholder="Telefone"
            id="telefone"
            name="telefone"
            onChange={() => onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="mb-2">
        <label className="text-gray-500 mb-2 font-bold" htmlFor="telefone">
            Categoria
        </label>
        <select
        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
        onChange={onChangeHandler}
      >
        <option value="" selected disabled>
          Selecione uma categoria
        </option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nome}
          </option>
        ))}
      </select>
        </div>
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="cpf">
            Animal
          </label>
          <input
            type="text"
            placeholder="CPF"
            id="cpf"
            name="cpf"
            onChange={() =>onChangeHandler}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        
        <div className="mb-2">
          <label className="text-gray-500 mb-2 font-bold" htmlFor="imagem">
            Foto do Produto
          </label>
          <input
            type="file"
            id="imagem"
            name="imagem"
            accept="image/*"
            onChange={() => onChangeHandler()}
            className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
          />
        </div>
        <div className="flex flex-col justify-between items-center my-3 mb-5">
          <button className="text-white font-bold bg-blue-500 py-2 px-3 border rounder hover:bg-blue-700" > 
            Registrar
          </button>
          <button className="text-white font-bold bg-blue-500 py-2 px-3 border rounder hover:bg-blue-700" onClick={(e) => getCategorias(e)} > 
            buttonteste
          </button>

          
          {/* <Link to="/login" className="text-blue-500"><p>Already have an account</p></Link> */}
        </div>
      </form>
      <ToastContainer />
    </div>
    ) }

    
    
    </>
  );
    
};

export default Registrar;
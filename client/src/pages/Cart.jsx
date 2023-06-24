import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import './cart_style.css';
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, email } =
    useContext(GlobalContext);
  const history = useNavigate();
  console.log("testee 3232"+email);
  const { LoginStatus, IsLoggedIn, AdminStatus } = useContext(GlobalContext);

  if (!LoginStatus) {
    history("/");
  }

  const [inputs, setInputs] = useState({
    precototal: "",
    produto: "",
    cliente: "1",
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  useEffect(() => {
    setInputs((prev) => ({ ...prev, precototal: totalPrice.toFixed(2) }));
  }, [totalPrice]);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const Finalizarpedido = (e, totalPrice) => {
    e.preventDefault();
  
    console.log("total valor " + totalPrice);
    setInputs((prev) => ({ ...prev, precototal: totalPrice.toFixed(2) }));
    console.log(inputs.precototal);
  
    axios
      .get(`http://localhost:5000/cliente/email/${inputs.email}`)
      .then((res) => {
        // Verifique se o usuário foi encontrado
        if (res.data) {
          console.log("Usuário encontrado:", res.data);
          
          // Faça a requisição POST para enviar o pedido
          axios
            .post(
              "http://localhost:5000/pedido/",
              { ...inputs, precototal: totalPrice.toFixed(2) },
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
        } else {
          console.log("Usuário não encontrado");
          // Faça algo caso o usuário não seja encontrado, como exibir uma mensagem de erro ou redirecionar para uma página específica
        }
      })
      .catch((err) => {
        console.log(`Request error: ${err}`);
      });
  };
  

  





  return (
    <div className="w-full min-h-full flex justify-center" id="cart">
      <div className="w-[95%] mt-[90px] flex justify-between">
        <div className="w-[70%]">
          <table className="w-full border-collapse border border-slate-400">
            <tr className="bg-slate-300">
              <th className="border border-slate-700 p-3 ">Nome</th>
              <th className="border border-slate-700 p-3 ">Preço</th>
              <th className="border border-slate-700 p-3 ">Imagem</th>
              <th className="border border-slate-700 p-3 ">Quantidade</th>
              <th className="border border-slate-700 p-3 ">Total</th>
              <th className="border border-slate-700 p-3 ">Ação</th>
            </tr>
            {cart.length > 0 ? (
              cart.map((item) => {
                return (
                  <tr className="hover:bg-slate-100">
                    <td className="border border-slate-300 text-center">
                      {item.name}
                    </td>
                    <td className="border border-slate-300 text-center">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="border border-slate-300 text-center">
                      <img src={item.image} className="w-20 h-20 object-contain mx-auto" />
                    </td>
                    <td className="border border-slate-300 text-center">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="py-1 px-2 focus:border border-orange-300 mx-2 font-bold text-2xl"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="py-1 px-2 focus:border border-orange-300 mx-2 font-bold text-2xl"
                      >
                        +
                      </button>
                    </td>
                    <td className="border border-slate-300 text-center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="border border-slate-300 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="py-1 px-2 rounded bg-red-500 text-white"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center font-bold text-3xl">
                  Nenhum item selecionado
                </td>
              </tr>
            )}
          </table>
        </div>
        
        <div className="w-[25%] shadow py-3 px-2 flex justify-center">
          <div className="w-[95%]">
          <h3 className="text-3xl fond-bold text-gray-600 text-center my-4 w-full border border-b-slate-200">
            Informações do Carrinho
          </h3>
          <h4 className="text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">Total de Itens: {cart.length}</h4>
          <h4 className="text-bold text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
            Quantidade Total :{" "}
            {cart.reduce((sum, items) => (sum += items.quantity), 0)}
            
          </h4>

          <h4 className="text-bold text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
            Preço Total:{" "}
            $ {cart.reduce((sum, items) => (sum += items.price * items.quantity), 0).toFixed(2)}
          </h4>
          
          <button
          className="bg-orange-400 rounded px-3 py-2 text-white w-full my-4"
          onClick={(e) => Finalizarpedido(e, totalPrice)}
        >
          Finalizar Pedido
        </button>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Cart;

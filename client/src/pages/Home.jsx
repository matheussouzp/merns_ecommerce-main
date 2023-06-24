import React, { useEffect, useState } from "react";
import img1 from "../assets/1.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import '../pages/home_style.css'
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie';
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext/GlobalContext";


const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { email , codigo, cart, addToCart, updateCart } = useContext(GlobalContext);
  console.log("GPT LINDO");
  console.log(email);
  console.log(codigo);

  useEffect(() => {
    axios({
      url: "http://localhost:5000/produto",
      method: "get",
    })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(products);

  const addToCartHandler = (event) => {
    event.preventDefault();
    
    let id = event.target.id;
    const token = Cookie.get("jwt_token");
    
    if (token) { //logica pra add item ao carrinho
      const name = document.getElementById("hiddenname" + id).value;
      const price = document.getElementById("hiddenprice" + id).value;
      const image = document.getElementById("hiddenimage" + id).value;
      const codigo = document.getElementById("hiddencodigo" + id).value;


      const newItem = {

        id,
        name,
        price: +price,
        image,
        quantity: 1,
        codigo,
      };
      console.log(newItem);
  
      const findItem = cart.find((item) => item.id === id);
  
      if (findItem) {
        // console.log("exist");
        updateCart(id);
        // console.log(cart);
        return;
      }
  
      addToCart(newItem);
      //  console.log(cart);
    }else {
      // Caso não haja um token ou um usuário existente, redireciona para a página de login
      navigate("/login");
    }
    
  };

  return (
    <div className="w-full">
      {/* <div className="">
        <img src={img1} className="h-[350px] w-full" />
      </div> */}
     <h1 id="product_font_home">Produtos</h1>
      <div className="w-full flex justify-center mt-5 mb-4" id="cards">
        <div className="grid gap-4 grid-cols-3 w-[80%]">
          {products.map((product) => {
            return ( 
            <Link to={`produto/detalhes/${product.codigo}`}>

                <div className="shadow" key={product._id} id="card">
                <img src={product.url_img} className="h-[250px] w-full object-contain"  />

                <div className="w-[95%] flex justify-between my-3 ">
                  
                  <div className="mx-2">
                    <h2>{product.nome}</h2>
                    <h3>Por : R${product.preco}</h3>
                    <h3 className="hover:text-orange-400">NOTA: {parseFloat(product.medianota).toFixed(2)}</h3>



                    <input
                      type="hidden"
                      value={product.codigo}
                      id={`hiddencodigo${product._id}`}
                    />
                    <input
                      type="hidden"
                      value={product.nome}
                      id={`hiddenname${product._id}`}
                    />
                    <input
                      type="hidden"
                      value={product.preco}
                      id={`hiddenprice${product._id}`}
                    />
                    <input
                      type="hidden"
                      value={product.url_img}
                      id={`hiddenimage${product._id}`}
                    />







                  </div>
                  <div>
                    <button
                      id={product._id}
                      onClick={addToCartHandler}
                      className=" block py-2 px-5 bg-orange-400 text-white rounded"
                    >
                      Comprar
                    </button>
                    
                  </div>
                </div>
              </div>
                    </Link>
              
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

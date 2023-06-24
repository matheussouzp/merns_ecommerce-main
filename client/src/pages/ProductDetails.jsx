import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import './detail.css';

const ProductDetails = () => {
  const {productid} = useParams();
  console.log("testeeee " + productid);  


  const { cart, addToCart, updateCart } = useContext(GlobalContext);

  const [product, setProduct] = useState([]);

 useEffect(() => {
    axios({
      url: `http://localhost:5000/produto/${productid}`,
      method: "get",
    })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productid]);

  const addToCartHandler = () => {
    const newItem = {
      id: product._id,
      name: product.nome,
      price: +product.preco,
      image: product.url_img,
      quantity: 1,
    };

    const findItem = cart.find((item) => item.id === product._id);

    if (findItem) {
      //console.log("exist");
      updateCart(product._id);
      // console.log(cart);
      return;
    }

    addToCart(newItem);

    //console.log(cart);
    //console.log(newItem);
  };

  return (
    <div className="main_card">
      <div className="w-[80%] mt-[90px] grid gap-4 grid-cols-2">
        <div>
          <img src={product.url_img} className="w-full" />
        </div>
        <div className="grid gap-4">
          <div>
            <h2 className="hover:text-orange-400">{product.nome}</h2>
            <h3 className="my-2">R${product.preco}</h3>
            <h3 className="hover:text-orange-400">NOTA: {parseFloat(product.medianota).toFixed(2)}</h3>
            <p className="hover:text-orange-400">{product.descricao}</p>
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
    </div>
  );
};

export default ProductDetails;

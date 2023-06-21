import React, { Component } from 'react'
import './sobre_style.css'
export class Sobre extends Component {
  render() {
    return (
      <div>
        <h1 id="product_font_about">Sobre Nós </h1>

        <div class="card" id='card_sobre'>
            <img src={"../assets/about.jpg"} class="card-img-top" alt="" id='img'/>
            <div class="card-body">
                <h5 class="card_title">Sobre nós</h5>
                <p class="card_text">A partir deste Website temos o objetivo de oferecer os melhores produtos para o seu melhor Amigo !</p>
                <p class="card_text">Estamos sempre dispostos a esclarecer suas dúvidas !!</p>
            </div>
            </div>
      </div>
      
    )
  }
}

export default Sobre
import React, { Component } from 'react'
import './footer_style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter,faFacebook,faInstagram} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export class Footer extends Component {
  render() {
    return (
        <div class="fixed_footer">
        <Link to="/sobre">
        <h2 id="footer_text">Sobre nós</h2>
        </Link>

        <Link to={"/cart"}>
        <h2 id="footer_text">Meu Carrinho</h2>
        </Link>
        <Link to={"/politica"}>
        <h2 id="footer_text">Política de Compra</h2>
        </Link>
        <FontAwesomeIcon icon={faTwitter}  id='icons'/>
        <FontAwesomeIcon icon={faFacebook} id='icons'/>
        <FontAwesomeIcon icon={faInstagram} id='icons'/>        
        
        </div>
    )
  }
}

export default Footer
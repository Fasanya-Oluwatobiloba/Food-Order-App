import { useContext } from "react";

import logoImg from "../assets/logo.jpg";
import CartContext from "../Store/CartContext";
import UserProgressContext from "../Store/UseProgressContext";
import Button from "./UI/Button.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const dynamicCount = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo" id="img" className="md:w-40 w-10" />
        <h1>REACTFOOD</h1>
      </div>
      <Button textOnly onClick={handleShowCart}>
        Cart({dynamicCount})
      </Button>
    </header>
  );
}

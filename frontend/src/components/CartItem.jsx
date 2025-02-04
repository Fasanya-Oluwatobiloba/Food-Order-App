import { useContext } from "react";
import { currencyFormatter } from "../util/formatting.js";
import CartContext from "../Store/CartContext.jsx";

export default function CartItem({ item }) {
	const cartCtx = useContext(CartContext);

  return (
    <li className="cart-item">
      <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
      <p className="cart-item-actions">
        <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => cartCtx.addItem(item)}>+</button>
      </p>
    </li>
  );
}

import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../Store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../Store/UseProgressContext";
import useHttp from "../useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userContextProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
	clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userContextProgressCtx.hideCheckOut();
  }

  function handleFInish() {
	userContextProgressCtx.hideCheckOut();
	cartCtx.clearCart();
	clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" onClick={handleClose} textOnly>
        Close
      </Button>
      <Button>Submit order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending Order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userContextProgressCtx.progress === "checkout"}
        onClose={handleFInish}
      >
        <h2>Success</h2>
        <p>Order submitted successfully</p>
        <p>We will get back to you with more details via email within the next few minutes</p>
        <p className="modal-actions">
          <Button onClick={handleFInish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userContextProgressCtx.progress === "checkout"}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

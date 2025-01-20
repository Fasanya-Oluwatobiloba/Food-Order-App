import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

function cartReducer(state, action) {
	if (action.type === 'ADD_ITEM')  {
		const checkIfItExist = state.items.findIndex((item) => item.id === action.item.id)

		const copyItem = [...state.items]

		if (checkIfItExist > -1) {
			const beforeItem = state.items[checkIfItExist]
			const newCopyItem = {
				...beforeItem,
				quantity: beforeItem.quantity + 1
			}
			copyItem[checkIfItExist] = newCopyItem;
		} else {
			copyItem.push({...action.item, quantity: 1})
		}

		return {...state, items: copyItem};
	}
	
	if (action.type === 'REMOVE_ITEM') {
		const checkIfItExist = state.items.findIndex((item) => item.id === action.id)

		const ifTheParticularItemExist = state.items[checkIfItExist]

		const copyItem = [...state.items]
		if (ifTheParticularItemExist.quantity === 1) {
			copyItem.splice(checkIfItExist, 1);
		} else {
			const newCopyItem = {
				...ifTheParticularItemExist,
				quantity: ifTheParticularItemExist.quantity - 1
			}
			copyItem[checkIfItExist] = newCopyItem
		}

		return {...state, items: copyItem};
	}

	if (action.type === 'CLEAR_CART') {
		return {...state, items: []};
	}

	return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const cartContext ={
	items: cart.items,
	addItem: (item) => dispatchCartAction({ type: 'ADD_ITEM', item }),
	removeItem: (id) => dispatchCartAction({ type: 'REMOVE_ITEM', id }),
	clearCart: () => dispatchCartAction({ type: 'CLEAR_CART' })
  }

  console.log(cartContext);

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;


// if (action.type === "ADD_ITEM") {
//     const existingCartIemIndex = state.items.find(
//       (item) => item.id === action.item.id
//     );

//     const updatedItems = [...state.items];

//     if (existingCartIemIndex > -1) {
//       const existingItem = state.items[existingCartIemIndex];
//       const updatedItem = {
//         ...existingItem,
//         quantity: existingItem.quantity + 1,
//       };
//       updatedItems[existingCartIemIndex] = updatedItem;
//     } else {
//       updatedItems.push({ ...action.item, quantity: 1 });
//     }

//     return { ...state, items: updatedItems };
//   }

//   if (action.type === "REMOVE_ITEM") {
//     const existingCartIemIndex = state.items.find(
//       (item) => item.id === action.id
//     );

//     const existingCartItem = state.items[existingCartIemIndex];

// 	const updatedItems = [...state.items];
//     if (existingCartItem === 1) {
//       updatedItems.splice(existingCartIemIndex, 1);
//     } else {
//       const updatedItem = {
//         ...existingCartItem,
//         quantity: existingCartItem.quantity - 1,
//       };
// 	  updatedItems[existingCartIemIndex] = updatedItem;;
//     }

// 	return { ...state, items: updatedItems };
//   }

//   return state;

// function addItem(item) {
// 	dispatchCartAction({ type: 'ADD_ITEM', item });
//   }

//   function removeItem(id) {
// 	dispatchCartAction({ type: 'REMOVE_ITEM', id });
//   } 

//   const cartContext = {
// 	items: cart.items,
// 	addItem,
// 	removeItem
//   }
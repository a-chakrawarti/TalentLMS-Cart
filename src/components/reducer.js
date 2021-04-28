const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "REMOVE_ITEM": {
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
    case "ADD_ITEM": {
      console.log("Add Item clicked!");
      const updatedCart = state.cart.map((item) => {
        return item.id === action.payload
          ? { ...item, amount: item.amount + 1 }
          : item;
      });
      return { ...state, cart: updatedCart };
    }
    case "SUBTRACT_ITEM": {
      console.log("Subtract Item clicked!");
      const updatedCart = state.cart
        .map((item) => {
          return item.id === action.payload
            ? { ...item, amount: item.amount - 1 }
            : item;
        })
        .filter((item) => item.amount !== 0);
      return { ...state, cart: updatedCart };
    }

    case "TOTAL_AMOUNT": {
      let { total, itemsInCart } = state.cart.reduce(
        (cartTotal, item) => {
          const { price, amount } = item;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.itemsInCart += amount;
          return cartTotal;
        },
        {
          total: 0,
          itemsInCart: 0,
        }
      );

      total = parseFloat(total.toFixed(2));
      console.log(itemsInCart);
      return { ...state, total, itemsInCart };
    }

    case "LOADING": {
      return { ...state, loading: true };
    }

    case "SHOW_ITEMS": {
      return { ...state, cart: action.payload, loading: false };
    }
    default:
      console.log("Invalid action detected!");
  }
  return state;
};

export default reducer;

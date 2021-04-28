import React, { useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  itemsInCart: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const addItem = (id) => {
    dispatch({ type: "ADD_ITEM", payload: id });
  };
  const subtractItem = (id) => {
    dispatch({ type: "SUBTRACT_ITEM", payload: id });
  };

  // Fetch data

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING" });
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: "SHOW_ITEMS", payload: data });
    };

    fetchData();
  }, []);

  // Add price of all items
  useEffect(() => {
    dispatch({ type: "TOTAL_AMOUNT" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        addItem,
        subtractItem,
      }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

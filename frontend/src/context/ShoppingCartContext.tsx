import React, {createContext, useContext, useEffect, useState} from "react";
import { useLocalStorage } from "../hooks/uselocalstorage/useLocalStorage.ts";

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

interface CartItem {
  id: number;
  qty: number;
  color: string;
  image?: string;
  price?: number;
  name?: string;
}

type CartState = Record<string, CartItem>;

interface ShoppingCartContext {
  cartItem: CartState;
  addToCart: (product: any, color: string) => void;
  handleIncreaseProductQty: (id: number, color: string) => void;
  handleDecreaseProductQty: (id: number, color: string) => void;
  getProductQty: (id: number, color: string) => number;
  deleteCart: (id: number, color?: string | null) => void;
  removeCart: ()=>void
  unique_id_generator: (id: number, color: string) => string;
  total: number;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCartContext = () => useContext(ShoppingCartContext);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItem, setCartItem] = useLocalStorage<CartState>("cartItems", {});
  const [total, setTotal] = useState(0);

  function unique_id_generator(id: number, color: string) {
    return `${id}-${color}`;
  }

  function addToCart(product: any, color: string) {

    const image = product.images?.[0]?.image;
    const price = product?.properties?.find((item) => item.color_code == color)?.price;
    const uniqueKey = unique_id_generator(product.id, color);

    setCartItem((prevState) => {
      const newState = { ...prevState };
      if (!newState[uniqueKey]) {
        newState[uniqueKey] = {
          id: product.id,
          color,
          qty: 1,
          image,
          price,
          name: product.name,
        };
      }
      return newState;
    });
  }

  function handleIncreaseProductQty(id: number, color: string) {
    const uniqueKey = unique_id_generator(id, color);
    setCartItem((prevState) => {
      const newState = { ...prevState };
      if (newState[uniqueKey]) {
        newState[uniqueKey] = {
          ...newState[uniqueKey],
          qty: newState[uniqueKey].qty + 1,
        };
      }
      return newState;
    });
  }

  function handleDecreaseProductQty(id: number, color: string) {
    const uniqueKey = unique_id_generator(id, color);
    setCartItem((prevState) => {
      const newState = { ...prevState };
      if (!newState[uniqueKey]) return newState;

      if (newState[uniqueKey].qty === 1) {
        delete newState[uniqueKey];
      } else {
        newState[uniqueKey] = {
          ...newState[uniqueKey],
          qty: newState[uniqueKey].qty - 1,
        };
      }
      return newState;
    });
  }

  function getProductQty(id: number, color: string) {
    const uniqueKey = unique_id_generator(id, color);
    return cartItem[uniqueKey]?.qty || 0;
  }

  function deleteCart(id: number, color: string | null = null) {
    if (color != null) {
      const uniqueKey = unique_id_generator(id, color);
      setCartItem((prevState) => {
        const newState = { ...prevState };
        delete newState[uniqueKey];
        return newState;
      });
    } else {
      setCartItem((prevState) => {
        const newState = { ...prevState };
        return Object.fromEntries(
          Object.entries(newState).filter(([key, value]) => value.id !== id)
        );
      });
    }
  }

  function removeCart() {
    setCartItem(prevState => prevState={})
  }

  useEffect(() => {
    let total = 0
    Object.values(cartItem).forEach(item=>{
      total += (item.qty*parseInt(item.price))
    })
    setTotal(total)

  }, [cartItem]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItem,
        addToCart,
        handleIncreaseProductQty,
        handleDecreaseProductQty,
        getProductQty,
        deleteCart,
        removeCart,
        total,
        unique_id_generator,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

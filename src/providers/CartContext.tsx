"use client";
import { fetchCartItems } from "@/app/()/server";
import { Product } from "@/app/utils/types";
import { Action, CartProduct, State, handleCartReducer } from "@/reducer/CartReducer";
import axios from "axios";
import {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
  useState,
} from "react";

export const CartContext = createContext<[State, Dispatch<Action>]>([
  {
    quantity: 1,
    cartItems: 0,
    cartProducts: [],
    total: 0,
  },
  () => {},
]);

export const CartContextProvider = ({ children, cart_items, cart_products, _total }: { children: ReactNode, cart_items: number, cart_products: CartProduct[], _total:number }) => {
  const [state, dispatch] = useReducer(handleCartReducer, {
    quantity: 1,
    cartItems: cart_items,
    cartProducts: cart_products,
    total: _total, 
  });
  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};

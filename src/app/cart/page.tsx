"use client";
import CartView from "../../../components/section/Cart";
import { Product } from "../utils/types";
import { CartContext } from "../../providers/CartContext";
import { useContext, useState } from "react";
import { ShoppingBagIcon } from "lucide-react";
import { Button } from "components/ui/button";
import axios from "axios";
import getStripe from "@/lib/stripe-load";
import { orders } from "@/lib/drizzle";
import { sora_d, sora_l } from "../layout";
// import { createCheckoutSession } from "./checkout";

export default function Page() {
  // const { cartProducts, cartItems, setCartItems, total } = useContext(CartContext);
  const [state, dispatch] = useContext(CartContext);
  const { cartItems, cartProducts, total } = state;

  const handleCheckout = async () => {
    const checkoutSession = await axios.post(
      "/api/checkout_session",
      cartProducts
    );
    if (checkoutSession.status == 500) {
      console.log(checkoutSession.statusText);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    console.warn(error);
  };

  console.log(total);

  return (
    <div className="main p-10">
      <div className="">
        <h3
          className={`scroll-m-20 text-2xl tracking-tight text-black ${sora_d.className}`}
        >
          Shopping Cart
        </h3>

        {cartProducts.length === 0 ? (
          <h1 className="font-bold flex flex-col justify-center items-center text-4xl text-black mt-10 gap-y-4">
            <span>
              <ShoppingBagIcon className="h-24 w-24" />
            </span>
            Your shopping bag is empty
          </h1>
        ) : (
          <div className="flex lg:flex-row flex-col">

            <div>
              {cartProducts.map((product, index) => (
                <CartView key={index} product={product} />
              ))}
            </div>

            <div className="bg-slate-50 space-y-5 ml-7 p-7">
              <h3 className={`scroll-m-20 text-xl tracking-tight ${sora_d.className}`}>
                Order Summary
              </h3>
              <span className={`flex justify-between ${sora_l.className}`}>
                <p>Quantity</p>
                <p className="pl-7 w-max">{cartItems} Product</p>
              </span>
              <span className={`flex justify-between ${sora_l.className}`}>
                <p>Total</p>
                <p className="pl-7">${total}</p>
              </span>
              <Button
                className={`bg-black rounded-none w-max  ${sora_l.className}`}
                onClick={handleCheckout}
              >
                Process to Checkout
              </Button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

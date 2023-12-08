import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/providers/CartContext";
import { CartProduct } from "@/reducer/CartReducer";
import { sora_d, sora_light } from "@/app/()/layout";
import axios from "axios";
import toast from "react-hot-toast";

export default function CartView({ product }: { product: CartProduct }) {
  const [state, dispatch] = useContext(CartContext);

  return (
    <div className="">
      <div className="flex gap-[2rem] lg:flex-row flex-col">
        <div>
          <Image
            className="rounded-lg"
            src={product.main_image.asset.url}
            alt="product image"
            width={189}
            height={189}
          ></Image>
        </div>

        <div className={`space-y-4 ${sora_light.className}`}>
          <p className="flex text-xl font-poppins tracking-wide justify-between items-center gap-x-3">
            {product.name + ` (${product.orderSize})`}

            <span className="w-6 h-6">
              <Trash2
                className="cursor-pointer"
                onClick={async () => {
                  toast.success("Product removed");
                  state.cartProducts.splice(
                    state.cartProducts.indexOf(product),
                    1
                  );
                  dispatch({
                    type: "DELETE_FROM_CART",
                    payload: { product: product, items: product.quantity },
                  });
                  await axios.put("/api/db/cart/cartProducts", {
                      id: product._rev,
                      size: product.orderSize,
                  });
                }}
              />
            </span>
          </p>
          <p className="text-gray-500 font-semibold">
            {product.subCategory.name}
          </p>
          <p className="font-semibold">Delivery Estimation</p>
          <p className="text-yellow-400 font-semibold text-base">
            5 Working Days
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">${product.subTotal}</p>
            <div className="flex gap-2 ">
              <Button
                onClick={async () => {
                  const updatedCartItems: number =
                    product.quantity > 1
                      ? state.cartItems - 1
                      : state.cartItems;
                  const prevTotal = state.total;
                  const total =
                    product.quantity > 1
                      ? prevTotal - product.price
                      : prevTotal;
                  product.quantity = Math.max(product.quantity - 1, 1);
                  product.subTotal = product.price * product.quantity;
                  dispatch({
                    type: "DECREASE_FROM_CART",
                    payload: {
                      items: updatedCartItems,
                      product: product,
                      totalAmount: total,
                    },
                  });
                  await axios.patch("api/db/cart/cartProducts", {
                    quantity: product.quantity,
                    id: product._rev,
                    size: product.orderSize,
                  });
                }}
                className="rounded-full"
              >
                -
              </Button>
              <span className="w-9 justify-center items-center flex">
                {product.quantity}
              </span>
              <Button
                onClick={async () => {
                  product.quantity += 1;
                  product.subTotal = product.price * product.quantity;
                  dispatch({
                    type: "INCREASE_FROM_CART",
                    payload: { product: product, items: 1 },
                  });
                  await axios.patch("api/db/cart/cartProducts", {
                    quantity: product.quantity,
                    id: product._rev,
                    size: product.orderSize,
                  });
                }}
                className="rounded-full"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "components/ui/button";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { sora } from "../layout";
import axios from "axios";
import { CartContext } from "@/providers/CartContext";

const page = () => {
  const [state, dispatch] = useContext(CartContext);
  const { cartItems, cartProducts, total } = state;

  useEffect(() => {
    // const order = axios.post("/api/db", {
    //   id,
    //   productIds,
    //   total,
    // });
    // console.log(order);
    const productIds: string[] = cartProducts.map((item) => item._rev);
    axios.post("/api/db", {
      // id,
      productIds,
      total,
    }).then((res) => console.log(res)).catch((err) => console.log(err));
  });
  return (
    <div
      className={`${sora.className} flex flex-col items-center justify-center gap-4 pt-20 px-6`}
    >
      <p className="text-5xl">Order Placed Successfully!</p>
      <Link href="/shop">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
};

export default page;

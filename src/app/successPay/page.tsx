"use client";

import { Button } from "components/ui/button";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { sora } from "../layout";
import axios from "axios";
import { CartContext } from "@/providers/CartContext";
import stripe from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const page = () => {
  const [state, dispatch] = useContext(CartContext);
  const { cartItems, cartProducts, total } = state;
  const [paidStatus, setPaidStatus] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const insertOrder = async () => {
      const { data } = await axios.get("/api/db");
      const { session_id } = data;
      const productIds = Array(searchParams.get("productIds")!);
      const total = searchParams.get('total');
      const session = await stripe.checkout.sessions.retrieve(
        session_id
      );
      console.log(session);
      if (
        session.payment_status === "paid" &&
        session.payment_intent
      ) {
        setPaidStatus(true);
        const order = await axios.post("/api/db", {
          session_id,
          productIds,
          total,
        });
        console.log(order);
      }
    };
    if(!paidStatus) {
      insertOrder()
    };
  }, [paidStatus]);

  return paidStatus ? (
    <div
      className={`${sora.className} flex flex-col items-center justify-center gap-4 pt-20 px-6`}
    >
      <p className="text-5xl">Order Placed Successfully!</p>
      <Link href="/shop">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  ) : (
    <div
      className={`${sora.className} text-3xl flex items-center justify-center pt-20`}
    >
      <p>Processing...</p>
    </div>
  );
};

export default page;

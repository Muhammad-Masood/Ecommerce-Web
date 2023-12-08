"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import stripe from "@/lib/utils";
import { getSessionId, insertOrderDB } from "../server";
import { sora } from "../layout";
import { Button } from "components/ui/button";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { CartContext } from "@/providers/CartContext";

const Page = () => {
  const router = useRouter();
  const [state, dispatch] = useContext(CartContext);
  useEffect(() => {
    async function insertOrder() {
      const session_id: string | null = await getSessionId();
      console.log(session_id);
      if (session_id !== null && session_id !== undefined) {
        console.log(session_id);
        const session = await stripe.checkout.sessions.retrieve(session_id);
        console.log(session);
        if (session.payment_status === "paid" && session.payment_intent) {
          state.cartItems = 0;
          state.cartProducts = [];
          state.quantity = 0;
          state.total = 0;
          const order = await insertOrderDB(session_id);
        }
      } else {
        router.replace('/');
      }
    }
    insertOrder();
  }, []);

  return (
    <div>
      <div
        className={`${sora.className} flex flex-col items-center justify-center gap-4 pt-20 px-6`}
      >
        <p className="text-5xl">Order Placed Successfully!</p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;

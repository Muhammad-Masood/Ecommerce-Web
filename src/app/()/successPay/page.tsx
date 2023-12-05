"use client";

import { Button } from "components/ui/button";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { sora } from "../layout";
import axios from "axios";
import stripe from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { getSessionId } from "../server";

const page = () => {
  const [paidStatus, setPaidStatus] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const insertOrder = async () => {
      const session_id: string = await getSessionId();
      const productIds = Array(searchParams.get("productIds")!);
      const sizes: string[] = Array(searchParams.get("sizes")!);
      const session = await stripe.checkout.sessions.retrieve(session_id);
      console.log(session);
      if (
        session.payment_status === "paid" &&
        session.payment_intent &&
        !paidStatus
      ) {
        setPaidStatus(true);
        const order = await axios.post("/api/db", {
          session_id,
          productIds,
          sizes,
        });
        console.log(order);
      }
    };
    insertOrder();
  }, [searchParams]);

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

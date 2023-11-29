import { db, orders } from "@/lib/drizzle";
import stripe from "@/lib/utils";
import { CartProduct } from "@/reducer/CartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { NextApiRequest } from "next";
import { StaticImageData } from "next/image";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const body: CartProduct[] = await req.json(); // array of items

    const line_items = body.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.main_image.asset.url],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items,
      payment_method_types: ["card"],
      success_url: `${req.nextUrl.origin}/successPay`,
      cancel_url: `${req.nextUrl.origin}/cart`,
    };
    const session = await stripe.checkout.sessions.create(params);
    console.log("session_id", session.id);
    cookies().set('session_id', session.id, {secure: true});
    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.log(err);
  }
}

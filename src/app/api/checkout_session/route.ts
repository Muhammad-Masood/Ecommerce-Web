import stripe from "@/lib/utils";
import { CartProduct } from "@/reducer/CartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { NextApiRequest } from "next";
import { StaticImageData } from "next/image";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from 'next/headers'

interface CheckoutBodyParams {
  cartProducts: CartProduct[];
  productIds: string[]; 
  total: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBodyParams = await req.json();
    const { cartProducts, productIds, total } = body;
    const sizes: string[] = cartProducts.map((product) => product.orderSize? product.orderSize : '');
    const line_items = cartProducts.map((item) => {
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
      success_url: `${req.nextUrl.origin}/successPay?productIds=${productIds}&sizes=${sizes}`,
      cancel_url: `${req.nextUrl.origin}/cart`,
    };
    const session = await stripe.checkout.sessions.create(params);
    console.log(session.id);
    cookies().set('session_id', session.id, {httpOnly: true});
    return NextResponse.json({ session: session });
  } catch (err) {
    console.log(err);
  }
}

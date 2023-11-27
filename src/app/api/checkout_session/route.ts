import { Product } from "@/app/utils/types";
import { db, orders } from "@/lib/drizzle";
import stripe from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import { StaticImageData } from "next/image";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface ProductCheckoutProps {
    name: string;
    image: StaticImageData;
    price: number;
    quantity: number;
}

export async function POST(req: NextRequest){
    try {
        const body: Product[] = await req.json(); // array of items
        const productIds: string[] = body.map((item) => item._rev);
        console.log(body);

        const line_items = body.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [req.nextUrl.origin+item.main_image.asset.url],
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            }
        });

        const params: Stripe.Checkout.SessionCreateParams = {
            mode: "payment",
            line_items,
            payment_method_types: ["card"],
            success_url: `${req.nextUrl.origin}/successPay`,
            cancel_url: `${req.nextUrl.origin}/cart?status=cancel`,
        }
        const session = await stripe.checkout.sessions.create(params);
        console.log('session_id', session.id);
        console.log('session_url',session.url);
        return NextResponse.json({id: session.id});
    } catch(err){
        console.log(err);
    }
} 


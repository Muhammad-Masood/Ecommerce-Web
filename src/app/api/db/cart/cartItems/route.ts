import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const {user} = auth();
        // const cartItemsResult = await sql `select sum(quantity) from cartproducts join cart on cart.product_id = cartproducts.id;`;
      return NextResponse.json({ user_details: user });
    } catch (error) {
      console.log(error);
    }
  }
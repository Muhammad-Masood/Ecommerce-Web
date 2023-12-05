import { db, Orders, CartProducts, Cart } from "@/lib/drizzle";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface OrdersBodyProps {
  session_id: string;
  productIds: string[];
  sizes: string[];
}
export async function POST(request: NextRequest) {
  try {
    const body: OrdersBodyProps = await request.json();
    const { session_id, productIds, sizes } = body;
    
    
    const insertProduct = await db.insert(Products).values({
      image: 
    })
    const insertOrder = await db.insert(Orders).values({
      order_id: session_id,
      status: "pending",
    });
    cookies().delete("session_id");
    const orderInserted = await db.insert(orders).values({
      order_id: session_id,
      product_id: productIds,
      status: "pending",
      sizes: sizes
    });
    console.log(orderInserted);
    return NextResponse.json({ order_data: orderInserted });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}



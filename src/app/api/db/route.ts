import { db, orders } from "@/lib/drizzle";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface OrdersBodyProps {
  // session_id: string;
  productIds: string[];
  total: number;
}
export async function POST(request: NextRequest) {
  try {
    const body: OrdersBodyProps = await request.json();
    const { productIds, total } = body;
    const session_id:string = cookies().get('session_id')!.value;
    const orderInserted = await db.insert(orders).values({
      payment_id: session_id,
      product_id: productIds,
      total: BigInt(total),
    });
    NextResponse.json({ order_data: orderInserted });
  } catch (error) {
    NextResponse.json({ error });
  }
}

import { db, orders } from "@/lib/drizzle";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface OrdersBodyProps {
  session_id: string;
  productIds: string[];
  total: number;
}
export async function POST(request: NextRequest) {
  try {
    const body: OrdersBodyProps = await request.json();
    const { session_id, productIds, total } = body;
    cookies().delete("session_id");
    console.log("cookies_deleted!");
    console.log(productIds);
    console.log(total);
    const orderInserted = await db.insert(orders).values({
      payment_id: session_id,
      product_id: productIds,
      total: BigInt(total),
    });
    console.log(orderInserted);
    return NextResponse.json({ order_data: orderInserted });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

export async function GET() {
  try {
    const getSessionId = cookies().get("session_id");
    return NextResponse.json(
      { session_id: getSessionId!.value },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error();
  }
}

import { Cart, CartProducts, db } from "@/lib/drizzle";
import { auth } from "@clerk/nextjs";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const body: { quantity: number; id: string, size: string } = await request.json();
    const { id, quantity, size } = body;
    const user = auth()
    const cartProductUpdateResult = await db
      .update(CartProducts)
      .set({
        quantity: quantity,
      })
      .where(and(eq(CartProducts.product_id, id), eq(CartProducts.size, size), eq(CartProducts.user_id, user.userId!)));
    return NextResponse.json({ message: cartProductUpdateResult });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {userId} = auth();
    const body: { id: string, size: string } = await request.json();
    const { id, size } = body;
    await db.execute(sql`DELETE FROM cart USING cartproducts where cart.cart_product_id = cartproducts.id
    and cartproducts.user_id = ${userId} and cartproducts.product_id = ${id} and cartproducts.size = ${size}`);
    const deleteCartProduct = await db
      .delete(CartProducts)
      .where(and(eq(CartProducts.product_id, id), eq(CartProducts.user_id, userId!), eq(CartProducts.size, size)));
    return NextResponse.json({ message: deleteCartProduct });
  } catch (error) {
    console.log(error);
  }
}
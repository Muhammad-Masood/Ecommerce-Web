import { CartProducts, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const body: { quantity: number; id: string } = await request.json();
    const { id, quantity } = body;
    const cartProductUpodateResult = await db
      .update(CartProducts)
      .set({
        quantity: quantity,
      })
      .where(eq(CartProducts.id, id));
    console.log(cartProductUpodateResult);
    return NextResponse.json({ message: cartProductUpodateResult });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body: { id: string } = await request.json();
    const { id } = body;
    const deleteCartProducts = 
    console.log(deleteCartProducts);
    return NextResponse.json({ message: deleteCartProducts });
  } catch (error) {
    console.log(error);
  }
}

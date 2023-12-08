import { fetchCartProductId } from "@/app/()/server";
import { fetchProductByID } from "@/app/data";
import { PImage } from "@/app/utils/types";
import { Cart, CartProducts, db } from "@/lib/drizzle";
import { CartProduct } from "@/reducer/CartReducer";
import { auth } from "@clerk/nextjs";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

interface CartBodyProps {
  product_id: string;
  quantity: number;
  size: string;
  userId: string;
  cartProductExist: CartProduct
}

export async function POST(request: NextRequest) {
  try {
    const body: CartBodyProps = await request.json();
    const { product_id, quantity, size, userId, cartProductExist } = body;
    if (cartProductExist) {
      console.log("product_exists_in_cart");
      const updatedCartProduct = await db.update(CartProducts).set({
        quantity: quantity,
        size: size,
      }).where(and(eq(CartProducts.product_id, product_id), eq(CartProducts.user_id, userId)));
      return NextResponse.json({
        cart_product_inserted: updatedCartProduct,
        message: "Cart product updated",
      });
    } else {
      const insertedCartProduct = await db
        .insert(CartProducts)
        .values({
          product_id: product_id,
          size: size,
          quantity: quantity,
          user_id: userId,
        })
        .returning({ id: CartProducts.id });
        console.log(insertedCartProduct);
      const insertCartResult = await db.insert(Cart).values({
        cart_product_id: insertedCartProduct[0].id,
      });
      return NextResponse.json({ cart_product_inserted: insertedCartProduct });
    }
  } catch (error) {
    return NextResponse.json({error: error});
  }
}

export async function DELETE() {
  try {
    const { userId } = auth();
    await db.execute(sql`DELETE FROM cart USING cartproducts where cart.cart_product_id = cartproducts.id
    and cartproducts.user_id = ${userId}`);
    const deleteCartProducts = await db
      .delete(CartProducts)
      .where(eq(CartProducts.user_id, userId!));
    return NextResponse.json({ message: deleteCartProducts });
  } catch (error) {
    return NextResponse.json({error: error});
  }
}

"use server";

import { Cart, CartProducts, db } from "@/lib/drizzle";
import { CartProduct } from "@/reducer/CartReducer";
import { auth, authMiddleware, currentUser } from "@clerk/nextjs";
import { and, eq, sql } from "drizzle-orm";
// import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { fetchProductByID } from "../data";

export const getSessionId = async () => {
  const sessionId = cookies().get("session_id");
  return sessionId!.value;
};

export const fetchCartItems = async (_user_id: string) => {
  const cart_items = await db.execute(
    sql`select sum(quantity) from cartproducts join cart on cart.product_id = cartproducts.id where cart.user_id = ${_user_id}`
  );
  return Number(cart_items.rows[0].sum);
};

export const fetchCartProducts = async (_user_id: string) => {
  let total: number = 0;
  const getCartProductsIds = await db
    .select({ product_id: Cart.cart_product_id })
    .from(Cart)
    .where(eq(Cart.user_id, _user_id));
  const cartProductsPromise: Promise<CartProduct>[] = getCartProductsIds
    ? getCartProductsIds.map(async (product) => {
        const productsData1 = await fetchProductByID(product.product_id!);
        const productsData2 = await db
          .select({
            quantity: CartProducts.quantity,
            size: CartProducts.size,
          })
          .from(CartProducts)
          .innerJoin(Cart, eq(CartProducts.id, Cart.cart_product_id))
          .where(
            and(
              eq(Cart.user_id, _user_id),
              eq(CartProducts.id, product.product_id!)
            )
          );
        productsData1.subTotal = productsData1.price * productsData2[0].quantity;
        total += productsData1.subTotal;

        return {
          ...productsData1,
          quantity: productsData2[0].quantity,
          orderSize: productsData2[0].size,
        };
      })
    : [];
    const cartProducts: CartProduct[] = await Promise.all(cartProductsPromise);
    return {cartProducts,total}
};



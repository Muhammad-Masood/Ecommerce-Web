"use server";
import { CartProducts, Orders, db } from "@/lib/drizzle";
import { CartProduct } from "@/reducer/CartReducer";
import { auth, authMiddleware, currentUser } from "@clerk/nextjs";
import { and, eq, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { fetchProductByID } from "../data";


interface OrdersBodyProps {
  session_id: string;
}

export const getSessionId = async () => {
  const sessionId = cookies().get("session_id");
  return sessionId?.value || null;
};

export const fetchCartItems = async (_user_id: string) => {
  const cart_items = await db.execute(
    sql`select sum(quantity) from cartproducts where user_id = ${_user_id}`
  );
  return Number(cart_items.rows[0].sum);
};

export const fetchCartProducts = async (_user_id: string) => {
  let total: number = 0;
  const loadUserCartProducts = await db
    .select()
    .from(CartProducts)
    .where(eq(CartProducts.user_id, _user_id));
  const cartProductsPromise: Promise<CartProduct>[] = loadUserCartProducts
    ? loadUserCartProducts.map(async (cart_product) => {
        const cartProductData = await fetchProductByID(cart_product.product_id);
        cartProductData.subTotal =
          cartProductData.price * cart_product.quantity;
        total += cartProductData.subTotal;
        return {
          ...cartProductData,
          quantity: cart_product.quantity,
          orderSize: cart_product.size,
        };
      })
    : [];
  const cartProducts: CartProduct[] = await Promise.all(cartProductsPromise);
  return { cartProducts, total };
};

export const fetchCartProductId = async (_product_id: string, _size: string) => {
  const {userId} = auth();
  const cartProductId = await db.select({id: CartProducts.id}).from(CartProducts).where(and(eq(CartProducts.product_id, _product_id), eq(CartProducts.user_id, userId!), eq(CartProducts.size, _size)));
  return cartProductId[0].id;
}

export const insertOrderDB = async (session_id: string) => {
  try {
    const user = auth();
    const loadUserCartProducts = (await db.select().from(CartProducts).where(eq(CartProducts.user_id, user.userId!)));
    loadUserCartProducts.map(async (cart_product) => {
      await db.insert(Orders).values({
        product_id: cart_product.product_id,
        quantity: cart_product.quantity,
        size: cart_product.size,
        user_id: user.userId!,
        payment_id: session_id,
        status: "pending",
      });
    });
    cookies().delete("session_id");
    await db.execute(sql`DELETE FROM cart USING cartproducts where cart.cart_product_id = cartproducts.id
    and cartproducts.user_id = ${user.userId!}`);
    await db.delete(CartProducts).where(eq(CartProducts.user_id, user.userId!));
    return { order_data: "order_inserted" };
  } catch (error) {
    console.log(error);
    return { message: error };
  }
}
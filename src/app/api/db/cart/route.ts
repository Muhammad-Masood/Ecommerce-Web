import { fetchProductByID } from "@/app/data";
import { PImage } from "@/app/utils/types";
import { Cart, CartProducts, db } from "@/lib/drizzle";
import { CartProduct } from "@/reducer/CartReducer";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

interface CartBodyProps {
  product_id: string;
  quantity: number;
  size: string;
  userId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CartBodyProps = await request.json();
    const { product_id, quantity, size, userId } = body;
    const productExistsInCart = await db.select().from(CartProducts).where(and(eq(CartProducts.product_id, product_id), eq(CartProducts.size, size), eq(CartProducts.user_id, userId)));
    if(productExistsInCart){
      const updatedCartProduct = await db.update(CartProducts).set({
        quantity: quantity,
        size: size,
      });
      return NextResponse.json({ cart_product_inserted: updatedCartProduct, message: "Cart product updated" });
    } else {
      const insertedCartProduct = await db.insert(CartProducts).values({
      product_id: product_id,
      size: size,
      quantity: quantity,
      user_id: userId,
    });
    const insertCartResult = await db.insert(Cart).values({
      cart_product_id: ,
    });
    return NextResponse.json({ cart_product_inserted: insertCartResult });
  } 
  } catch (error) {
    console.log(error);
  }
}

// export const getConnectedUser = () => {
//   return new Promise<string|null>((resolve, reject) => {
//     auth()
//       .getToken()
//       .then((token) => {
//         if (token) {
//           resolve(auth().userId);
//         }
//       })
//       .catch((error) => reject(error));
//   });
// };

// export async function GET() {
//   try {
//     const userId:string|null = await getConnectedUser();
//     if (userId) {
//       const getCartProductsIds = await db
//         .select({ product_id: Cart.cart_product_id })
//         .from(Cart)
//         .where(eq(Cart.user_id, userId));
//       const cartProductsPromise: Promise<CartProduct>[] = getCartProductsIds
//         ? getCartProductsIds.map(async (product) => {
//             const productsData1 = await fetchProductByID(product.product_id!);
//             console.log(productsData1);
//             const productsData2 = await db
//               .select({
//                 quantity: CartProducts.quantity,
//                 size: CartProducts.size,
//               })
//               .from(CartProducts)
//               .innerJoin(Cart, eq(CartProducts.id, Cart.cart_product_id))
//               .where(
//                 and(
//                   eq(Cart.user_id, userId),
//                   eq(CartProducts.id, product.product_id!)
//                 )
//               );
//             console.log(productsData2);

//             return {
//               ...productsData1,
//               quantity: productsData2[0].quantity,
//               orderSize: productsData2[0].size,
//             };
//           })
//         : [];
//       const cartProducts = await Promise.all(cartProductsPromise);
//       return NextResponse.json({ cart_products: cartProducts });
//     } else {
//       return NextResponse.json({ cart_products: [] });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

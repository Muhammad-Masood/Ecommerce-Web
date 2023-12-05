"use server";

import { db, orders } from "@/lib/drizzle";
import { PImage } from "../utils/types";
import stripe from "@/lib/utils";
import { MAIN_IMAGE, fetchMainImage } from "../data";

interface OrderDBInterface {
  order_id: string;
  product_id: string[];
  status: string;
  sizes: string[];
}

export type OrderProduct = {
  name: string;
  quantity: number;
  price: number;
  subTotal: number;
  image: MAIN_IMAGE;
  size: string;
};

export interface OrdersData {
  order_id: string;
  products: OrderProduct[];
  total: number;
  status: string;
  created_at: string;
}

export const getOrdersData = async () => {
  const ordersTableData: OrderDBInterface[] = await db.select().from(orders);

  const orders_data_promises: Promise<OrdersData>[] = ordersTableData.map(
    async (order, i) => {
      const session = await stripe.checkout.sessions.retrieve(order.order_id);
      const date = new Date(session.created * 1000);
      const line_items = await stripe.checkout.sessions.listLineItems(
        order.order_id
      );
      const image = await fetchMainImage(order.product_id[0].split(",")[i]);
      const products: OrderProduct[] = line_items.data.map((item, pi) => ({
        image: image,
        name: item.description,
        quantity: item.quantity!,
        price: item.price!.unit_amount! / 100,
        subTotal: item.amount_subtotal / 100,
        size: ordersTableData[i].sizes[pi],
      }));
      return {
        order_id: order.order_id,
        products: products,
        status: order.status,
        total: session.amount_total! / 100,
        created_at:
          date.toLocaleDateString("default") +
          " " +
          date.toLocaleTimeString("en-US"),
      };
    }
  );

  const orders_data: OrdersData[] = await Promise.all(orders_data_promises);

  return orders_data;
};

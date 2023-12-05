import { sql } from "@vercel/postgres";
import {
  integer,
  pgTable,
  serial,
  varchar,
  PgArray,
  bigint,
  primaryKey,
  foreignKey,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const CartProducts = pgTable("cartproducts", {
  id: serial("id").primaryKey(),
  size: varchar("size").notNull(),
  quantity: integer("quantity").notNull(),
  product_id: varchar("product_id", { length: 255 }).notNull(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
});

export const Cart = pgTable(
  "cart",
  {
    id: serial("id").primaryKey(),
    cart_product_id: integer("cart_product_id"),
  },
  (cart) => {
    return {
      userReference: foreignKey({
        columns: [cart.cart_product_id],
        foreignColumns: [CartProducts.id],
      }),
    };
  }
);

export const Orders = pgTable(
  "orders",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    cart_id: integer("cart_id"),
    status: varchar("status", { length: 255 }).notNull(),
  },
  (orders) => {
    return {
      cartReference: foreignKey({
        columns: [orders.cart_id],
        foreignColumns: [Cart.id],
      }),
    };
  }
);

export const db = drizzle(sql);

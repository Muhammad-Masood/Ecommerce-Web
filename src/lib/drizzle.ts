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
    id: serial("id").primaryKey(),
    payment_id: varchar("payment_id", { length: 255 }).unique().notNull(),
    status: varchar("status", { length: 255 }).unique().notNull(),
    product_id: varchar("product_id", { length: 255 }).notNull(),
    size: varchar("size", { length: 6 }).notNull(),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    quantity: integer("quantity").notNull(),
  },
);

export const db = drizzle(sql);

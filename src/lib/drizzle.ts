import { sql } from "@vercel/postgres";
import { integer, pgTable, serial, varchar, PgArray, bigint } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";


// export const customer = pgTable("customers", {
//     id: serial("order_id"),
//     name: varchar("customer_name", {length: 100}),
//     email: varchar("customer_email", {length: 120}),
//     password: varchar("customer_password", {length: 100}),
// });

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    product_id: varchar ("product_id").array().notNull(),
    total: bigint ("total", {mode: "bigint"}).notNull(),
    payment_id: varchar("payment_id").unique().notNull(),
});

export const db = drizzle(sql);
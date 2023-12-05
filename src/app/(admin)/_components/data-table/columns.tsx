"use client";

import { Product } from "@/app/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { OrderProduct } from "../../server";

export type Order = {
  order_id: string;
  products: OrderProduct[];
  total: number;
  status: string;
  created_at: string;
  //   id: string
  //   name: string
  //   image: string
  //   status: "pending" | "shipped" | "delivered" | "cancelled"
  //   total: number
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

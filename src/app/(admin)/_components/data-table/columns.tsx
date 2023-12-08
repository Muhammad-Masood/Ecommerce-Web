"use client";

import { Product } from "@/app/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { OrderProduct, OrdersData } from "../../server";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { sora_l } from "@/app/()/layout";

export const columns: ColumnDef<OrdersData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "products",
    header: ({ table }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            table
              .getColumn("total")
              ?.toggleSorting(table.getColumn("total")?.getIsSorted() === "asc")
          } //column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Products
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const products: OrderProduct[] = row.getValue("products");
      if (products.length === 1) {
        return (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>{products[0].name}</AccordionTrigger>
              <AccordionContent>
              <div className={`space-y-5 ${sora_l.className}`}>
                <div className="flex gap-x-2 pb-1">
                  <Image
                    src={products[0].image.main_image.asset.url}
                    alt="product_image"
                    width={50}
                    height={50}
                  />
                  <p className="pt-4">{products[0].name}</p>
                </div>
                <div className="flex gap-x-2 pb-2">
                  <p>Price ${products[0].price}.00</p>
                  <p>Size {products[0].size}</p>
                  <p>SubTotal ${products[0].subTotal}.00</p>
                </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      } else {
        return (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>{products[0].name}...</AccordionTrigger>
              <AccordionContent>
                {products.map((product, index) => (
                  <div className={`space-y-5 ${sora_l.className}`} key={index}>
                    <div className="flex gap-x-2">
                      <Image
                        src={products[0].image.main_image.asset.url}
                        alt="product_image"
                        width={50}
                        height={50}
                      />
                      <p className="pt-4">{product.name}</p>
                    </div>
                    <div className="flex pb-2 gap-x-3">
                      <p>Price ${product.price}.00</p>
                      <p>Size {product.size}</p>
                      <p>SubTotal ${product.subTotal}.00</p>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("created_at")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product_id = row.getValue("");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ship Order</DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

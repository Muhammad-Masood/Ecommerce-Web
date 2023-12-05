import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Stripe from "stripe";
import { fetchCategories } from "@/app/data";
import { Category } from "@/app/utils/types";

export type AdminLink = {
  name: string;
  href: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export default stripe;

export const adminLinks: AdminLink[] = [
  {
    name: "Orders",
    href: "orders"
  }
]

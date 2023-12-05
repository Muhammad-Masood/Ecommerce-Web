import stripe from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT () {
    try {
        return NextResponse.json({})
    } catch (error) {
        console.log(error);
    }
} 
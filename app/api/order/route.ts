import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // In a real application, you would validate the body and save the order to a database here
        console.log("Received order:", body);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            message: "Order successfully placed!",
            orderId: `ORD-${Date.now()}`
        });
    } catch (error) {
        console.error("Order error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to place order" },
            { status: 500 }
        );
    }
}
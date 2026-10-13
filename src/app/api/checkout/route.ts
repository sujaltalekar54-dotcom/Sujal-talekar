import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateOrderNumber } from "@/lib/utils";
import Razorpay from "razorpay";

const razorpay =
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      })
    : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, shipping, total, address } = body;

    if (!items?.length || !address) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();

    // Create order in database (demo user for now)
    // In production with Clerk, use the authenticated user
    let user = await prisma.user.findFirst({ where: { email: address.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: `demo_${Date.now()}`,
          email: address.email,
          name: address.name,
          phone: address.phone,
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        totalAmount: total,
        shippingAmount: shipping,
        shippingName: address.name,
        shippingPhone: address.phone,
        shippingLine1: address.line1,
        shippingLine2: address.line2 || null,
        shippingCity: address.city,
        shippingState: address.state,
        shippingPincode: address.pincode,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // Create Razorpay order if configured
    let razorpayOrderId = null;
    if (razorpay) {
      const rzpOrder = await razorpay.orders.create({
        amount: total, // already in paise
        currency: "INR",
        receipt: orderNumber,
        notes: {
          orderId: order.id,
          orderNumber,
        },
      });
      razorpayOrderId = rzpOrder.id;

      await prisma.order.update({
        where: { id: order.id },
        data: { paymentId: razorpayOrderId },
      });
    }

    return NextResponse.json({
      orderId: order.id,
      orderNumber,
      razorpayOrderId,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

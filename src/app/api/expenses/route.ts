import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/db";
import { TransactionType, Category } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { description, date, category, type, amount } = body;

    if (!description || !date || !category || !type || !amount) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transaction = await prisma.transactions.create({
      data: {
        description,
        date: new Date(date),
        category: category as Category,
        type: type as TransactionType,
        amount: parseFloat(amount),
        userId: user.id,
      },
    });

    console.log("Transaction created:", transaction);
    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

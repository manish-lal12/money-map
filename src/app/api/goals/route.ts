import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    const body = await req.json();
    const { title, description, amount, duration } = body;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (!title || !description || !amount || !duration) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const goal = await prisma.financialGoals.create({
      data: {
        title,
        description,
        amount,
        duration,
        userId: user.id,
      },
    });
    return NextResponse.json({ goal }, { status: 201 });
  } catch (error) {
    console.error("Error creating goal:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    const goal = await prisma.financialGoals.findMany({
      where: {
        user: {
          id: user?.id,
        },
      },
    });
    return NextResponse.json(goal);
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

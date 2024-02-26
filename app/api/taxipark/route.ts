import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const taxipark = await prismadb.taxipark.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(taxipark);
  } catch (error) {
    console.log("[TAXIPARK_POST]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

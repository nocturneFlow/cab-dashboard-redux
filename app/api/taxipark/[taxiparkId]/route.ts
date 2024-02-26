import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { taxiparkId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.taxiparkId) {
      return new NextResponse("Taxipark id is required", { status: 400 });
    }

    const taxipark = await prismadb.taxipark.updateMany({
      where: {
        id: params.taxiparkId,
        userId: userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(taxipark);
  } catch (error) {
    console.log("[TAXIPARK_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { taxiparkId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.taxiparkId) {
      return new NextResponse("Taxipark id is required", { status: 400 });
    }

    const taxipark = await prismadb.taxipark.deleteMany({
      where: {
        id: params.taxiparkId,
        userId: userId,
      },
    });

    return NextResponse.json(taxipark);
  } catch (error) {
    console.log("[TAXIPARK_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

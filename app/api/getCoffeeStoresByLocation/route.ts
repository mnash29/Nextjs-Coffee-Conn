import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const longitude = searchParams.get("long") || "";
    const latitude = searchParams.get("lat") || "";
    const limit = searchParams.get("limit") || "";

    const longLatCoords = {
        longitude: parseInt(longitude),
        latitude: parseInt(latitude),
    };

    const response = await fetchCoffeeStores(longLatCoords, limit);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching coffee stores:", error);
    return NextResponse.json(
      { message: "Error fetching coffee stores", error },
      { status: 500 }
    );
  }
}

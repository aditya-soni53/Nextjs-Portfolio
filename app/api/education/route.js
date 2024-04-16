import Education from "@/models/Education";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const extractData = await req.json();

    await Education.create(extractData);

    return NextResponse.json({
      success: true,
      message: "Data saved successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function GET(req) {
  try {
    await connectToDB();

    const extractData = await Education.find({});

    return NextResponse.json({
      success: true,
      data: extractData,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

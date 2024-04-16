import Home from "@/models/Home";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const extractData = await req.json();

    await Home.create(extractData);

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

    const extractData = await Home.find({});

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

export async function PUT(req) {
  try {
    await connectToDB();

    const extractData = await req.json();

    const { _id, heading, summary } = extractData;

    const updateData = await Home.findOneAndUpdate(
      { _id },
      { heading, summary },
      { new: true }
    );

    if (updateData) {
      return NextResponse.json({
        success: true,
        message: "Updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

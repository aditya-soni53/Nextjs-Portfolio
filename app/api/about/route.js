import About from "@/models/About";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const extractData = await req.json();

    await About.create(extractData);

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

    const extractData = await About.find({});

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

    const {
      _id,
      aboutme,
      noofprojects,
      yearofexperience,
      noofclients,
      skills,
    } = extractData;

    const updateData = await About.findOneAndUpdate(
      { _id },
      { aboutme, noofprojects, yearofexperience, noofclients, skills },
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

import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const { username, password } = await req.json();

    // console.log(username, password, "login route");

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await hash(user.password, 12);

    const checkPassword = await compare(password, hashedPassword);

    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials,Try With correct credentials",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
  }
}

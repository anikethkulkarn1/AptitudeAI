import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";

export async function GET() {
  try {
    await connectDB();
    const questions = await Question.find({});
    return NextResponse.json(questions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

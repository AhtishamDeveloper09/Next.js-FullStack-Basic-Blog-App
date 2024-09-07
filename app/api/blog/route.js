import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("Database connection unsuccessfull!");
  }
}

export async function GET(request, reponse) {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json(
      { message: "Successfull", posts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request, reponse) {
  try {
    const { title, description } = await request.json();
    await main();
    const post = await prisma.post.create({ data: { title, description } });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

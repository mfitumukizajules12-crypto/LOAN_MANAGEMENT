import { NextResponse } from "next/server";
import databaseConnection from "@/app/lib/db"; // Update path relative to your lib directory
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const [rows] = await databaseConnection.query<RowDataPacket[]>("SHOW TABLES;");

    return NextResponse.json(
      { success: true, tables: rows },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Database connection error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to the database",
        details: error.message || error.code || "Unknown error",
      },
      { status: 500 }
    );
  }
}
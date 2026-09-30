import { NextRequest, NextResponse } from "next/server";
import { validateCreateUser } from "@/app/lib/validation/custom";
import databaseConnection from "@/app/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Run custom validation
        const { isValid, errors } = validateCreateUser(body);

        if (!isValid) {
            return NextResponse.json(
                {
                    message: "Validation failed. Missing or invalid fields.",
                    errors,
                },
                { status: 400 }
            );
        }

        const { staffId, name, email, password, role} = body;

        // 2. Hash password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Save to MySQL Database
        const [result]: any = await databaseConnection.query(
            "INSERT INTO users (staff_id, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
            [staffId, name, email, hashedPassword, role]
        );

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                data: {
                    id: result.insertId,
                    staffId,
                    email,
                    role,
                },
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("User creation error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
import { NextRequest, NextResponse } from "next/server";
import { validateCreateUser } from "@/app/lib/validation/custom";
import databaseConnection from "@/app/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const connection = await databaseConnection.getConnection();

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

        const { name, email, password, role } = body;

        const normalizedUsername = name.trim().toLowerCase();
        const normalizedEmail = email.trim().toLowerCase();

        // 2. Hash password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Start Database Transaction
        await connection.beginTransaction();

        // Step A: Insert into staff (MySQL automatically generates `id` and `staff_id`)
        const [saveStaff]: any = await connection.execute(
            "INSERT INTO staff (full_name, department) VALUES (?, ?)", 
            [name, "Not assigned yet"]
        );

        const numericStaffId = saveStaff.insertId;

        // Step B: Retrieve the generated staff_id from MySQL
        const [staffRows]: any = await connection.execute(
            "SELECT staff_id FROM staff WHERE id = ?",
            [numericStaffId]
        );
        const generatedStaffId = staffRows[0].staff_id;

        // Step C: Save user using the generated staff_id
        const [userResult]: any = await connection.execute(
            "INSERT INTO users (staff_id, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
            [generatedStaffId, normalizedUsername, normalizedEmail, hashedPassword, role || "member"]
        );

        await connection.commit();

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                data: {
                    id: userResult.insertId,
                    staffId: generatedStaffId,
                    email: normalizedEmail,
                    role: role || "member",
                },
            },
            { status: 201 }
        );

    } catch (error: any) {
        await connection.rollback();
        console.error("User creation error:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}